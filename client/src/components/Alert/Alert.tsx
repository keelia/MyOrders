import { useState, type ReactNode } from 'react';
import { ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

const AlertType = {
  Success: 'Success',
  Error: 'Error',
} as const;


export type AlertType = (typeof AlertType)[keyof typeof AlertType];

interface AlertProps {
  message?: ReactNode,
  type?: AlertType
}


export default function Alert(props: AlertProps) {
  const [closed, setClosed] = useState(false);
  const { message, type } = props;
  return (
    message && !closed && <div className='flex w-auto justify-center bg-white z-10 absolute text-wrap left-0'>
      {type === 'Error' ? <ExclamationTriangleIcon className="mx-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-red-300 sm:mx-0 sm:size-4" /> : <InformationCircleIcon className="mx-auto flex size-4 shrink-0 items-center justify-center rounded-full bg-green-300 sm:mx-0 sm:size-4" />}
      <div className='text-wrap'>
        {message}
      </div>
      <XMarkIcon className="mx-auto flex size-8 shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:size-4 w-10" onClick={() => setClosed(true)} />
    </div>
  )
}
