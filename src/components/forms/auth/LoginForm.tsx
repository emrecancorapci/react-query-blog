import { useForm } from 'react-hook-form';
import Button from '../../common/Button';

import type { SubmitHandler } from 'react-hook-form';
import { Input, Title, FormAlert } from '../../common/form';

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
        <Title>Username</Title>
        <Input
          placeholder="Enter your username"
          id="LoginUsernameControl"
          aria-invalid={errors.username === undefined ? 'false' : 'true'}
          {...register('username', { required: true })}
        />
        {errors.username !== undefined && (
          <FormAlert>{errors.username?.type === 'required' && 'Username is required.'}</FormAlert>
        )}
      </label>
      <label className="w-full" htmlFor="LoginPasswordControl">
        <Title>Password</Title>
        <Input
          placeholder="Enter your password"
          type="password"
          id="LoginPasswordControl"
          aria-invalid={errors.password === undefined ? 'false' : 'true'}
          {...register('password', { required: true, minLength: 7 })}
        />
        {errors.password !== undefined && (
          <FormAlert>
            {errors.password?.type === 'required' && 'Password is required.'}
            {errors.password?.type === 'minLength' && 'Password should be longer than 7 characters.'}
          </FormAlert>
        )}
      </label>
      <Button type="submit">Login</Button>
    </form>
  );
}
