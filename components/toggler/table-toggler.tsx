'use client';

import { Switch } from "../ui/switch";


interface IProps {
  id: string;
  is_active: boolean;
  action: (formData: FormData) => void;
}

function TabledTogglerView({ action, id, is_active = false }: IProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form action={action}>
        <input name="id" value={id} readOnly style={{ display: 'none' }} />
        <input name="is_active" value={JSON.stringify(is_active)} style={{ display: 'none' }} />
        <Switch
          dir="ltr"
          checked={is_active}
          name="is_active"
          type="submit"
          value={JSON.stringify(is_active)}
        />
      </form>
    </div>
  );
}

export default TabledTogglerView;
