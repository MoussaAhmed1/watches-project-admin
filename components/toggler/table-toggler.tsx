'use client';

import { Switch } from "../ui/switch";


interface IProps {
  id: string;
  is_active: boolean;
  action:(formData: FormData) => void;
}

function TabledTogglerView({ action ,id, is_active }: IProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form action={action}>
        <input name="id" value={id} readOnly style={{ display: 'none' }} />
        <Switch
          checked={is_active}
          name="is_active"
          type="submit"
        />
      </form>
    </div>
  );
}

export default TabledTogglerView;
