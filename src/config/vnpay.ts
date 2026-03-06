import { VNPay, HashAlgorithm } from 'vnpay'

const vnpaySandboxConfig = {
  tmnCode: process.env.VNP_TMN_CODE || 'D1911ZSD',
  secureSecret: process.env.VNP_HASH_SECRET || 'P50BE7TNXMZ5P29WF9PZLOS9ZICZ3VUB',
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true,
  hashAlgorithm: HashAlgorithm.SHA512,
  endpoints: {
    paymentEndpoint: 'paymentv2/vpcpay.html'
  }
}

export const vnpayInstance = new VNPay(vnpaySandboxConfig)

export function getReturnUrl(): string {
  const base = process.env.SERVER_URL || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}/api/vnpay/return`
}

export function getIpnUrl(): string {
  const base = process.env.SERVER_URL || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}/api/vnpay/ipn`
}
