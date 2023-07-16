import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

import Button from 'comp/common/Button';
import { Input, Textarea, Title, FormAlert } from 'comp/common/form';

export interface FormInputs {
  title: string;
  body: string;
  tags: Array<{ tag: string }>;
}

interface PostAddFormProperties {
  onSubmit: SubmitHandler<FormInputs>;
}

export default function PostAddForm({ onSubmit }: PostAddFormProperties): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ tag: '' });
    }
  }, [append, fields.length]);

  return (
    <form
      className="flex w-full flex-col content-center items-center gap-4 p-4 px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="w-full" htmlFor="titleControl">
        <Title>Post Title</Title>
        <Input
          placeholder="Enter the title"
          id="titleControl"
          aria-invalid={errors.title === undefined ? 'false' : 'true'}
          {...register('title', { required: true })}
        />
        {errors.title !== undefined && (
          <FormAlert>{errors.title?.type === 'required' && 'Title is required.'}</FormAlert>
        )}
      </label>
      <label className="w-full" htmlFor="contentControl">
        <Title>Content</Title>
        <Textarea
          placeholder="Tell your story"
          id="contentControl"
          aria-invalid={errors.body === undefined ? 'false' : 'true'}
          {...register('body', { required: true, minLength: 7 })}
        />
        {errors.body !== undefined && (
          <FormAlert>
            {errors.body?.type === 'required' && 'Content is required.'}
            {errors.body?.type === 'minLength' && 'Content should be longer than 7 characters.'}
          </FormAlert>
        )}
      </label>
      <label className="flex w-auto flex-col gap-2" htmlFor="tagsControl">
        <Title>Tags</Title>
        {fields.map((field, index) => (
          <div className="flex w-full max-w-fit items-center gap-4" key={field.id}>
            <Input
              id="tagsControl"
              placeholder="Enter tag name"
              aria-invalid={errors.tags === undefined ? 'false' : 'true'}
              {...register(`tags.${index}.tag`)}
            />
            {index > 0 ? (
              <Button
                onClick={() => {
                  remove(index);
                }}
              >
                X
              </Button>
            ) : (
              <Button
                className="disabled:opacity-0"
                disabled={true}
                onClick={() => {
                  remove(index);
                }}
              >
                X
              </Button>
            )}
          </div>
        ))}
        <Button
          onClick={() => {
            append({ tag: '' });
          }}
        >
          Add
        </Button>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
