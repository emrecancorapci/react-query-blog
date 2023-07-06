import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import Button from '../../common/Button';

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

  return (
    <form className="flex flex-col content-center items-center gap-6 p-4 px-12" onSubmit={handleSubmit(onSubmit)}>
      <label className="w-full" htmlFor="titleControl">
        <p className="pb-2">Title</p>
        <input
          className="w-full"
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
        <p className="pb-2">content</p>
        <input
          className="w-full"
          placeholder="Tell your story"
          type="content"
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
      <label className="w-full" htmlFor="tagsControl">
        <p className="pb-2">Tags</p>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              className="w-full"
              placeholder="Enter the tag"
              type="text"
              id="tagsControl"
              aria-invalid={errors.tags === undefined ? 'false' : 'true'}
              {...register(`tags.${index}.tag`)}
            />
            {index > 0 && (
              <Button
                type="button"
                onClick={() => {
                  remove(index);
                }}
              >
                Remove Tag
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
