import { TInputProps } from "../types";

/**
 * Componente que te permite generar inputs con sus respectivas validaciones
 * @param {string} type - Tipo de input
 * @param {string} name - Nombre del input
 * @param {boolean} disabled - Si el input está deshabilitado
 * @param {string} label - Label del input
 * @param {number} maxLength - Máximo de caracteres que puede tener el input
 * @param {TResolverOptions} rules - Reglas de validación del input rules de React hooks form
 * @param {TNumberMode} mode - Modo del número solo aplica en caso de que el type sea number
 * @param {boolean} allowZero - Si se permite el cero en el input solo aplica en caso de que el type sea number
 * @prop {TInputProps} props - Propiedades del componente
 * @returns
 */
const FInput = <T,>(props: TInputProps<T>) => {
  const {
    form,
    type,
    name,
    disabled,
    label,
    maxLength = 9999,
    rules,
    onkeydown,
  } = props;

  const { register, formState, watch, setValue } = form;

  const errorInput = formState.errors[name];

  const inputValue = watch(name);

  return (
    <div>
      <label
        htmlFor="input"
        className={`text-sm text-gray-700 dark:text-white `}
      >
        {name}
      </label>
      <input
        {...register(name, {
          ...rules,
        })}
        type={type}
        id={name}
        placeholder={`${name}`}
        className="mt-[2px] flex h-10 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
      />
    </div>
  );
};

export default FInput;
