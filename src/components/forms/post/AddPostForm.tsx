import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import Button from '../../common/Button';
import { useEffect } from 'react';

export interface FormInputs {
  title: string;
  body: string;
  tags: Array<{ tag: string }>;
}

export default function PostAddForm({ onSubmit }: { onSubmit: SubmitHandler<FormInputs> }): JSX.Element {
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
        <p className="pb-2 ps-2 font-semibold">Title</p>
        <input
          className="w-full rounded-lg bg-purple-dark px-4 py-2 font-medium text-white"
          placeholder="Enter the title"
          type="text"
          id="titleControl"
          aria-invalid={errors.title === undefined ? 'false' : 'true'}
          {...register('title', { required: true })}
        />
        {errors.title !== undefined && (
          <p role="alert" className="pt-2 text-xs text-red-600">
            {errors.title?.type === 'required' && 'Title is required.'}
          </p>
        )}
      </label>
      <label className="w-full" htmlFor="contentControl">
        <p className="pb-2 ps-2 font-semibold">Content</p>
        <textarea
          className="w-full rounded-lg bg-purple-dark px-4 py-2 font-medium text-white"
          placeholder="Tell your story"
          id="contentControl"
          aria-invalid={errors.body === undefined ? 'false' : 'true'}
          {...register('body', { required: true, minLength: 7 })}
        />
        {errors.body !== undefined && (
          <p role="alert" className="pt-2 text-xs text-red-600">
            {errors.body?.type === 'required' && 'Content is required.'}
            {errors.body?.type === 'minLength' && 'Content should be longer than 7 characters.'}
          </p>
        )}
      </label>
      <label className="flex w-auto flex-col gap-2" htmlFor="tagsControl">
        <p className="ps-2 font-semibold">Tags</p>
        {fields.map((field, index) => (
          <div className="flex w-full max-w-fit gap-4" key={field.id}>
            <input
              className="rounded-lg bg-purple-dark px-4 py-2 font-medium text-white"
              placeholder="Enter the tag"
              type="text"
              id="tagsControl"
              aria-invalid={errors.tags === undefined ? 'false' : 'true'}
              {...register(`tags.${index}.tag`)}
            />
            {index > 0 ? (
              <Button
                className=""
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                X
              </Button>
            ) : (
              <Button
                className="disabled:opacity-0"
                type="button"
                onClick={() => {
                  remove(index);
                }}
                disabled={true}
              >
                X
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={() => {
            append({ tag: '' });
          }}
        >
          Add Tag
        </Button>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
