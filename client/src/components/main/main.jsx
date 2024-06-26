import { useEffect, useState , useRef} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import SignaturePad from '../SignaturePad/SignaturePad'
import UserDataStore from '../../store/userData'
import userData from '../../store/userData'



function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
}

export default function Example() {
      const childRef = useRef();
      const [signature, setSignature] = useState(null);

      const handleEnd = (signature) => {
      setSignature(signature);
      };
      const [agreed, setAgreed] = useState(false)
      const [submit, setSubmit] = useState(false)
      const [usersData , setUserData] = useState({
            name: null,
            surName : null,
            userSide : null,
            Email : null,
            cardModel : null,
            cardCount : null
      })



      
      
      useEffect(()=>{
            UserDataStore.changeUser(usersData)
      },[usersData])
      useEffect(()=>{
            UserDataStore.changeAgreed(agreed)
      },[agreed])    
      return (
      <div className="isolate bg-white px-6 py-24 sm:py-24 lg:px-8">
            <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
            >
            <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
                  clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            />
            </div>
            <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Форма для получения картриджа</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
            от администратора для сотрудников
            </p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div >
                  <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Имя
                  </label>
                  <div className="mt-2.5">
                  <input
                  onChange={ (e)=> { setUserData({...usersData , name : e.target.value}) }}
                  value={usersData.name}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
            </div>
            <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Фамилия
                  </label>
                  <div className="mt-2.5">
                  <input
                  onChange={ (e)=> { setUserData({...usersData , surName : e.target.value})}}
                  value={usersData.surName}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
            </div>
            <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                  Отделение
                  </label>
                  <div className="mt-2.5">
                  <input
                  onChange={ (e)=> { setUserData({...usersData , userSide : e.target.value})}}
                  value={usersData.userSide}
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
            </div>
            <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                  </label>
                  <div className="mt-2.5">
                  <input
                  onChange={ (e)=> { setUserData({...usersData , Email : e.target.value})}}
                  value={usersData.Email}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
            </div>
            <div className="sm:col-span-2">
                  <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                  Модель картриджа
                  </label>
                  <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">

                  <select
                  onChange={ (e)=> { setUserData({...usersData , cardCount : e.target.value})}}
                  value={usersData.cardCount}
                        id="country"
                        name="country"
                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                        <option defaultValue>Кол-во</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                  </select>
                  
                  {/* <ChevronDownIcon
                        className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                        aria-hidden="true"
                  /> */}
                  </div>
                  <input
                  onChange={ (e)=> { setUserData({...usersData , cardModel : e.target.value})}}
                  value={usersData.cardModel}
                  type="text"
                  name="card-number"
                  id="card-number"
                  autoComplete="card-number"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
            </div>



            </div>
            <SignaturePad onEnd={handleEnd}  agreed ={agreed} agreedFunc ={setAgreed} submit = {submit} submitFunc = {setSubmit} setUserData={setUserData}/>
                  {signature && (
                        <div>
                        <h2>Saved Signature</h2>
                        <img src={signature} alt="Client signature" />
                        </div>
                  )}
                        <Field as="div" className="flex gap-x-4 sm:col-span-2">
                  <div className="flex h-6 items-center">
                  <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                        agreed ? 'bg-indigo-600' : 'bg-gray-200',
                        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                  >
                  <span className="sr-only">Agree to policies</span>
                  <span
                        aria-hidden="true"
                        className={classNames(
                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                        )}
                  />
                  </Switch>
                  </div>
                  <Label className="text-sm leading-6 text-gray-600">
                  я беру ответственность за {' '}
                  <a href="#" className="font-semibold text-indigo-600">
                  картридж&nbsp;модель - {usersData.cardModel} , кол-во - {usersData.cardCount}
                  </a>
                  .
                  </Label>
            </Field>
            <div className="mt-10">
            <p
                  
                  onClick={(e) => {
                        setSubmit(true);

                  }}
                  className= {`block w-full rounded-md ${agreed ? 'bg-indigo-600' : ' bg-gray-600'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${agreed ? 'bg-indigo-500' : ' bg-gray-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${agreed ? 'bg-indigo-600' : ' bg-gray-600'} cursor-pointer`}
            >
                  Взять картридж
            </p>
            </div>
            </form>
      </div>
      )
      }