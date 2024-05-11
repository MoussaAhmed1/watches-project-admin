import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { IPatient } from '@/types/patients';


const CustomMultipleSelector = ({ options, onCustomChange }: { options: IPatient[], onCustomChange: (options: Option[]) => void }) => {
  return (
    <div className="w-full">
      <MultipleSelector
        options={options?.map(options => ({ label: options?.first_name + options?.last_name, value: options?.id }))}
        onChange={(e) => { onCustomChange(e) }}
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
