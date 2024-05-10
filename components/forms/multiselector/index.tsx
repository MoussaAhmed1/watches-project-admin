import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { IPatient } from '@/types/patients';


const CustomMultipleSelector = ({options}:{options:IPatient[]}) => {
  console.log(options?.map(option=>({ label: option?.first_name+option?.last_name , value: option?.id })))
  return (
    <div className="w-full">
      <MultipleSelector
        options={options?.map(options=>({ label: options?.first_name+options?.last_name , value: options?.id }))}
        onChange={(e)=>{console.log(e)}}
        placeholder="Type something that does not exist in dropdowns..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default CustomMultipleSelector;
