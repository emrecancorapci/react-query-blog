import { useForm } from 'react-hook-form';
import Button from '../../common/Button';

import type { SubmitHandler } from 'react-hook-form';

export interface FormInputs {
  username: string;
  password: string;
}

export default function LoginForm({ onSubmit }: { onSubmit: SubmitHandler<FormInputs> }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form className="flex flex-col content-center items-center gap-4 px-12 pt-8" onSubmit={handleSubmit(onSubmit)}>
      <label className="w-full" htmlFor="LoginUsernameControl">
        <p className="pb-2 ps-2 font-semibold">Username</p>
        <input
          className="w-full rounded-lg bg-purple-dark px-4 py-2 font-medium text-white"
          placeholder="Enter your username"
          type="text"
          id="LoginUsernameControl"
          aria-invalid={errors.username === undefined ? 'false' : 'true'}
          {...register('username', { required: true })}
        />
        {errors.username !== undefined && (
          <p role="alert" className="pt-2 text-xs text-red-600">
            {errors.username?.type === 'required' && 'Username is required.'}
          </p>
        )}
      </label>
      <label className="w-full" htmlFor="LoginPasswordControl">
        <p className="pb-2 ps-2 font-semibold">Password</p>
        <input
          className="w-full rounded-lg bg-purple-dark px-4 py-2 font-medium text-white"
          placeholder="Enter your password"
          type="password"
          id="LoginPasswordControl"
          aria-invalid={errors.password === undefined ? 'false' : 'true'}
          {...register('password', { required: true, minLength: 7 })}
        />
        {errors.password !== undefined && (
          <p role="alert" className="pt-2 text-xs text-red-600">
            {errors.password?.type === 'required' && 'Password is required.'}
            {errors.password?.type === 'minLength' && 'Password should be longer than 7 characters.'}
          </p>
        )}
      </label>
      <Button type="submit">Login</Button>
    </form>
  );
}
