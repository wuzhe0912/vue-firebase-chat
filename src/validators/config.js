import { required, alphaNum, email, sameAs, numeric, minLength, maxLength, minValue, decimal } from 'vuelidate/lib/validators'
import { regEx } from '@/validators'

export const account = {
  alphaNum,
  required,
  minLength: minLength(6),
  maxLength: maxLength(12)
}

export const password = {
  required,
  minLength: minLength(6)
}

export const passwordCheck = {
  required,
  sameAsPassword: sameAs('password')
}

export const promotionCode = {
  alphaNum
}

export const name = {
  required,
  // nameFormat: regEx(/^[\u4e00-\u9fa5a-zA-Z]*$/),
  minLength: minLength(2)
}

export const nickName = {
  minLength: minLength(2),
  maxLength: maxLength(50)
}

export const checkEmail = {
  required,
  email
}

export const phone = {
  chineseMobile: regEx(/^1\d{10}$/),
  numeric
}

export const QQ = {
  numeric,
  minLength: minLength(5),
  maxLength: maxLength(11)
}

export const wechat = {
  wechatChar: regEx(/^[a-zA-Z0-9-]*$/),
  minLength: minLength(2),
  maxLength: maxLength(20)
}

export const verification = {
  required
}

export const checkVerification = {
  required,
  sameAsVerification: sameAs('verification')
}

// 會員中心/開戶網點(限制僅能輸入中文)
export const chinese = {
  required,
  chineseOnly: regEx(/^[\u4e00-\u9fa5]*$/),
  minLength: minLength(2),
  maxLength: maxLength(50)
}

// 銀行轉帳 轉帳人姓名(必填)
export const transferName = {
  required,
  nameFormat: regEx(/^[\u4e00-\u9fa5a-zA-Z_-\s.'·]*$/),
  minLength: minLength(2),
  maxLength: maxLength(50)
}

export const depositPot = {
  required,
  depositPotFormat: regEx(/^[\u4e00-\u9fa5a-zA-Z]*$/),
  minLength: minLength(2),
  maxLength: maxLength(50)
}

export const payMoney = {
  required,
  decimal,
  floatTwolength: regEx(/^\d+(.\d{0,2})?$/),
  minValue: minValue(0)
}

// 出款金額
export const outMoney = {
  required,
  mathOnly: numeric
}

export const bankCard = {
  required,
  numeric,
  minLength: minLength(2),
  maxLength: maxLength(50)
}

// 修改密碼頁面 - 檢查輸入舊密碼
export const oldPassword = {
  required,
  minLength: minLength(6),
  maxLength: maxLength(30)
}

// 修改密碼頁面 - 檢查輸入舊密碼
export const checkPwd = {
  required,
  sameAsPassword: sameAs('password')
}

// 修改密碼頁面 - 取款密碼
export const oldTakePassword = {
  required,
  numeric,
  minLength: minLength(4),
  maxLength: maxLength(30)
}

// 修改密碼頁面 - 新取款密碼
export const takePassword = {
  required,
  numeric,
  minLength: minLength(4),
  maxLength: maxLength(30)
}

// 修改密碼頁面 - 檢查新取款密碼
export const checkTakePwd = {
  required,
  sameAsPassword: sameAs('takePassword')
}

export const Required = {
  required
}
