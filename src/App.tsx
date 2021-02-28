import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import Images from './components/Images';
import SelectBox from './components/SelectBox';

// Small fix for typescript complaining about key being a string
interface AllBreadsInterface {
  [key: string]: string[] | [string];
}

interface FormInterface {
  breed: string;
  subbreed: string;
  number: string;
}

const App: React.FC = () => {
  const [allBreads, setAllBreads] = useState<AllBreadsInterface>({});
  const [images, setImages] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string>();

  const { register, errors, handleSubmit, watch, unregister } = useForm({
    mode: 'onChange'
  });

  /* To avoid any extra request later for subBreads select we will use the whole object with all breads*/
  const allBreedsKeys = Object.keys(allBreads);

  const selectedBreed = watch('breed');

  const selectedSubBreed = allBreads[selectedBreed];
  selectedBreed &&
    selectedSubBreed.length === 0 &&
    unregister('subbbread') &&
    setFetchError(undefined);

  const numberOfImages = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString()
  );

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(async (res) => {
        const fetchedResponse = await res.json();
        if (res.ok) {
          setAllBreads(fetchedResponse.message);
        } else {
          setFetchError(fetchedResponse.message);
        }
      })
      .catch((err) => setFetchError(err.message));
  }, []);

  const fetchImagesHandler = (form: FormInterface) => {
    setFetchError(undefined);
    if (form.subbreed) {
      fetch(
        `https://dog.ceo/api/breed/${form.breed}/${form.subbreed}/images/random/${form.number}`
      )
        .then(async (res) => {
          const fetchedImages = await res.json();
          if (res.ok) {
            setImages(fetchedImages.message);
            fetchedImages.message.length < parseInt(form.number) &&
              setFetchError(
                `Not enough images. We only have ${fetchedImages.message.length} of that sub breed in our database.`
              );
          } else {
            setFetchError(fetchedImages.message);
          }
        })
        .catch((err) => setFetchError(err.message));
    } else {
      fetch(
        `https://dog.ceo/api/breed/${form.breed}/images/random/${form.number}`
      )
        .then(async (res) => {
          const fetchedImages = await res.json();
          if (res.ok) {
            setImages(fetchedImages.message);
            fetchedImages.message.length < parseInt(form.number) &&
              setFetchError(
                `Not enough images. We only have ${fetchedImages.message.length} of that sub breed in our database.`
              );
          } else {
            setFetchError(fetchedImages.message);
          }
        })
        .catch((err) => setFetchError(err.message));
    }
  };

  return (
    <div className="App p-1">
      <img
        className="logo"
        src="https://dog.ceo/img/dog-api-logo.svg"
        alt="logo"
      />
      <form
        onSubmit={handleSubmit(fetchImagesHandler)}
        className="row d-flex justify-content-left m-4"
      >
        <SelectBox
          labelText="Breed"
          name="breed"
          register={register({ required: true, minLength: 1 })}
          values={allBreedsKeys}
          error={errors.breed}
        />

        {selectedSubBreed && selectedSubBreed.length > 0 && (
          <SelectBox
            labelText="Sub breed"
            name="subbreed"
            register={register({ required: false, minLength: 1 })}
            values={selectedSubBreed}
            error={errors.subBreeds}
          />
        )}
        <SelectBox
          labelText="Number of images"
          name="number"
          register={register({ required: true })}
          values={numberOfImages}
          error={errors.number}
        />

        <button type="submit" className="btn btn-primary row-3 mb-2 ml-3">
          Show images
        </button>
      </form>
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
      {images && <Images images={images} />}
    </div>
  );
};
export default App;
