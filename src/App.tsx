import { useState } from 'react'
import './App.css'
import Input from './components/Input/Input'
import { useForm } from 'react-hook-form';
import { FindBBoxSchema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { IBBoxRequest } from './types';
import OpenMapService from './mapService';

// -3.674905,41.308851,-3.603838,41.369942 good data
//  24.202154,-0.482686,24.202905,-0.481217 no data set

function App() {
  const [geoJsonData, setGeoJsonData] = useState<unknown>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IBBoxRequest>({
    resolver: yupResolver(FindBBoxSchema),
  });

  const submitHandler = async (data: IBBoxRequest) => {
    const response = await OpenMapService.getOSMBBoxData(data.minLong, data.minLat, data.maxLong, data.maxLat);
    setGeoJsonData(response)
  }

  console.log(geoJsonData);
  

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Input
          {...register('minLong')}
          name='minLong'
          type={'text'}
          label="Min Longitude"
          placeholder='24.202154'
          errorMsg={errors.minLong?.message}
        />
        <Input
          {...register('maxLong')}
          name='maxLong'
          type={'text'}
          label="Max Longitude"
          placeholder='24.202905'
          errorMsg={errors.maxLong?.message}
        />
        <Input
          {...register('minLat')}
          name='minLat'
          type={'text'}
          label="Min Latitude"
          placeholder='-0.482686'
          errorMsg={errors.minLat?.message}
        />
        <Input
          {...register('maxLat')}
          name='maxLat'
          type={'text'}
          label="Max Latitude"
          placeholder='-0.481217'
          errorMsg={errors.maxLat?.message}
        />

        <button type="submit">Get BBox Data</button>
      </form>

    </div>
  )
}

export default App;
