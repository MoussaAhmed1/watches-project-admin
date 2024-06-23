import axios from 'axios';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';


import Cookie from 'js-cookie';
import { GoogleMap } from '.';
import { Card } from '../ui/card';
import { Position } from '@/types/map';



const Map = ({ setMapData, defaultPos }: any) => {

  const  currentLang  = Cookie.get("Language");
  const methods = useFormContext();
  const {
    formState: { errors },
    setValue,
  } = methods;
  const [currentPosition, setCurrentPosition] = useState<Position>();
  useEffect(() => {
    const fetchAddress = async (language: string) => {
      try {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition?.lat},${currentPosition?.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=${language}`
        );
        return res.data.results[0].formatted_address;
      } catch (error) {
        console.error(error);
        return '';
      }
    };

    const fetchAddresses = async () => {
      const arAddress = await fetchAddress('ar');
      const enAddress = await fetchAddress('en');
      setMapData({
        coords: currentPosition,
        address: { add_ar: arAddress, add_en: enAddress },
      });
      setValue('address', currentLang === 'en' ? enAddress : arAddress, {
        shouldValidate: true,
      });
    };

    if (currentPosition) {
      fetchAddresses();
    }
  }, [currentPosition, setMapData, setValue, currentLang]);

  return (
    <Card style={{ padding: 3, marginLeft: 3, marginBottom: 1 }}>
      <div style={{ height: 'min(30rem, 90vw)', marginBottom: 1 }}>
        <GoogleMap
          defaultPosition={currentPosition || defaultPos}
          defaultZoom={defaultPos ? 13 : 5}
          setCurrentPosition={(p) => {
            setCurrentPosition(p);
          }}
        />
      </div>
      {/* Address */}
      {/* {true ? <Typography>adress</Typography> : null} */}
      {/* Map Error Msg */}
      {errors?.geo_location?.message && !currentPosition ? (
        <h4  color="error">
          {'map_error'}
        </h4>
      ) : null}
    </Card>
  );
};

export default Map;
