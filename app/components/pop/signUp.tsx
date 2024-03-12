import ClipSVG from '@/public/svg/clipTop.svg'
import Close from '@/public/svg/close_24.svg'
import LabelInput from '../input/labelInput'
import { ChangeEvent, useMemo, useState } from 'react'
import checkEmailType from '@/app/utils/checkEmail'
import checkContactNumber from '@/app/utils/checkContactNumber'

type Validate = {
  email: { msg: string, status: null | boolean },
  authCode: { msg: string, status: null | boolean },
  password: { msg: string, status: null | boolean },
  checkPassword: { msg: string, status: null | boolean },
  name: { msg: string, status: null | boolean },
  contact: { msg: string, status: null | boolean },
}

type Props = {
  handleSignUp: (arg: boolean) => void
}

type ChangeEvt = ChangeEvent<HTMLInputElement>['target']['value']

const initValidate = {
  email: { msg: '', status: null },
  authCode: { msg: '', status: null },
  password: { msg: '', status: null },
  checkPassword: { msg: '', status: null },
  name: { msg: '', status: null },
  contact: { msg: '', status: null },
} as const
const passwordPlaceholder = '영문, 숫자, 특수문자 혼합 8자 이상 입력'
const buttonClass = 'rounded-[999px] px-4 py-[5.5px] font-medium text-sm font-pretendard text-white whitespace-nowrap ml-2 bg-red05 disabled:bg-gray03'

const SignUp = ({ handleSignUp }: Props) => {
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [validate, setValidate] = useState<Validate>({ ...initValidate })

  const checkValidate = (key: keyof typeof initValidate, condition: boolean, errorMsg = '') => {
    if (condition) {
      setValidate((prev) => ({ ...prev, [key]: { msg: errorMsg, status: false } }))
      return;
    }

    setValidate((prev) => ({ ...prev, [key]: { msg: '', status: null } }))
  }


  const inputs = [
    {
      label: '이메일',
      validate: validate.email,
      placeholder: 'sample@email.com',
      type: 'email',
      value: email,
      name: 'email',
      onChange: (value: ChangeEvt) => {
        setEmail(value)
        setAuthCode('')
        setCheckEmail(false)
      },
      onBlur: () => {
      }
    },
    {
      label: '입력하신 이메일로 인증코드를 보냈어요!',
      validate: validate.authCode,
      placeholder: '영문, 숫자, 특수문자 혼합 8자 이상 입력',
      type: 'text',
      value: authCode,
      name: 'authCode',
      labelClass: '-mt-3 font-normal !text-[13px] !text-gray07',
      hide: checkEmail,
      onChange: (value: ChangeEvt) => {
        setAuthCode(value)
        if (value) {
          checkValidate('authCode', false)
        }
      },
    },
    {
      label: '비밀번호',
      validate: validate.password,
      placeholder: passwordPlaceholder,
      type: 'password',
      value: password,
      name: 'password',
      onChange: (value: ChangeEvt) => {
        setPassword(value)
      },
      onBlur: () => {
        checkValidate('password', /* 비밀번호 특수문자 + 숫자 + 영어 + 8자 이상 체크 */ false, '영문, 숫자, 특수문자 혼합하여 8자 이상으로 설정해야 합니다.')
      }
    },
    {
      label: '비밀번호 확인',
      validate: validate.checkPassword,
      placeholder: passwordPlaceholder,
      type: 'password',
      value: checkPassword,
      name: 'checkPassword',
      onChange: (value: ChangeEvt) => {
        setCheckPassword(value)
      },
      onBlur: () => {
        checkValidate('checkPassword', password === checkPassword, '비밀번호가 일치하지 않습니다.')
      }
    },
    {
      label: '이름',
      validate: validate.name,
      placeholder: '이름 입력',
      type: 'text',
      value: name,
      name: 'name',
      onChange: (value: ChangeEvt) => {
        setName(value)
      },
      onBlur: () => {
        checkValidate('name', /* 한글만 입력 체크 */ false, '한글만 입력해주세요. (영문, 특수기호 입력 불가)')
      }
    },
    {
      label: '휴대폰번호',
      validate: validate.contact,
      placeholder: '‘-’ 없이 숫자만 입력',
      type: 'tel',
      value: contact,
      name: 'contact',
      description: '*내 계정을 찾을 때 필요해요',
      onChange: (value: ChangeEvt) => {
        setContact(value)
      },
      onBlur: () => {
        checkValidate('contact', checkContactNumber(contact), '숫자만 입력해주세요.')
      }
    },
  ]

  const isConfirmed = useMemo(() => 
    !!email && !!validate.email.status && !!authCode && !!validate.authCode.status, 
  [email, authCode, validate.email.status, validate.authCode.status])

  const authEmail = async () => {
    console.log('인증요청');
    if (checkEmailType(email)) {
      checkValidate('email', true, '이메일을 정확히 입력해주세요.')
      return;
    }

    if (email === 'memopet@naver.com') { // test
      setValidate((prev) => ({ ...prev, email: { msg: '이미 가입한 계정입니다.', status: false }}))
      return
    }

    setValidate((prev) => ({ 
      ...prev, 
      email: { msg: '', status: true },
      authCode: { msg: '', status: null },
    }))
    setCheckEmail(true)
  }

  const checkAuthCode = async () => {
    console.log('인증확인');
    if (authCode === '1234') { // test
      setValidate((prev) => ({ ...prev, authCode: { msg: '인증코드가 일치하지 않습니다.', status: false }}))
      return
    }

    setValidate((prev) => ({ ...prev, authCode: { msg: '이메일이 인증되었습니다.', status: true }}))
  }

  return (
    <section className='fixed bg-[#0000004D] flex justify-center items-center top-0 left-0 w-full h-full z-50'>
      <aside className='relative bg-white w-full max-w-[480px] h-fit max-h-[905px] min-h-fit rounded-2xl p-10 border border-gray07 shadow-[0px_4px_4px_0px_#00000040]'>
        <ClipSVG className='absolute -top-[17px] -left-[14px]' />
        <button className='absolute w-6 h-6 top-4 right-4' onClick={() => handleSignUp(false)}>
          <Close className='text-gray09' />
        </button>
        <h1 className='text-gray09 text-[28px] font-medium leading-9 font-gothic mb-8'>회원가입</h1>
        <form className='flex flex-col gap-6'>
          {inputs.map((input) => (
            <LabelInput
              key={input.name}
              label={input.label}
              value={input.value}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              validate={input.validate}
              labelClass={input?.labelClass}
              hide={input?.hide}
              description={input?.description}
              onChange={input.onChange}
              onBlur={input?.onBlur}
            >
              {input.name === 'email' && 
                <button 
                  type='button' 
                  disabled={!input.value}
                  className={buttonClass}
                  onClick={authEmail}
                >
                  {
                    isConfirmed
                      ? '이메일 변경'
                      : email && validate.email.status && validate.authCode.status === false
                        ? '다시 요청'
                        : '인증 요청'
                  }
                </button>}
              {input.name === 'authCode' &&
                <button 
                  type='button'
                  disabled={!input.value || isConfirmed}
                  className={buttonClass}
                  onClick={checkAuthCode}
                >
                  확인
                </button>
              }
            </LabelInput>
          ))}
          <fieldset className='py-2'>
            <label className='block text-gray09 text-base h-6 font-normal'>
              <input type='checkbox'/>
              <a className='underline ml-2'>이용약관</a> 및 <a className='underline'>개인정보 보호정책</a>에 동의합니다.
            </label>
          </fieldset>
          <button type='submit' className='bg-red05 text-white rounded-lg py-[18px] font-semibold text-base leading-4'>가입하기</button>
        </form>
      </aside>
    </section>
  )
}

export default SignUp