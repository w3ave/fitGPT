import { useState, React, useRef, useEffect} from 'react';
import styles from "../styles/Generate.module.css";
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    weightGoal: '',
    timeFrame: '',
    height: '',
    activityLevel: '',
    healthCon: '',
    diet: '',
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      })
      
      if (!result.ok) {
        setError("Check your network and try again");
      }
  
      // This data is a ReadableStream
      const data = result.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
      }
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }

    toast.success("Copied!", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "copy-id",
      pauseOnHover: false,
    });
  }

  const errorToast = () => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "error-id",
      pauseOnHover: false,
    });
  }

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [result]);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <ToastContainer />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p>Generate a <span>Weight Loss Plan</span> in seconds.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Age:
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </label>
            <br />
            <label>
              Gender:
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
            </label>
            <br />
            <label>
              Weight:
              <input type="text" name="weight" placeholder='Specify with kg or lbs' value={formData.weight} onChange={handleChange} />
            </label>
            <br />
            <label>
              Goal Weight:
              <input type="text" name="weightGoal" placeholder='Specify with kg or lbs' value={formData.weightGoal} onChange={handleChange} />
            </label>
            <br />
            <label>
              Time Frame:
              <input type="text" name="timeFrame" placeholder='How long you plan to achieve your goal weight' value={formData.timeFrame} onChange={handleChange} />
            </label>
            <br />
            <label>
              Diet:
              <textarea name="diet" placeholder='Omnivore, Carnivore, Vegan, Keto, etc' value={formData.diet} onChange={handleChange} />
            </label>
            <br />
            <label>
              Activity Level:
              <textarea name="activityLevel" placeholder='Sedentary, lightly active, moderately active, very active, or extremely active' value={formData.actitivityLevel} onChange={handleChange} />
            </label>
            <br />
            <label>
              Medical Conditions:
              <textarea name="healthCon" placeholder='That may impact weight loss: Diabities, hypothyroidism, etc' value={formData.healthCon} onChange={handleChange} />
            </label>
            <br />
            <div className={styles.buttons}>
              <Button text={"Generate"} />
              {isLoading && <Loader />}
            </div>
          </form>
          <div className={styles.bottom}>
            {error ? errorToast() && <div style={{display: "none"}}></div> : result && 
            <div className={styles.result} ref={ref} key={"prompt"}>
              <button className={styles.button} onClick={handleCopy}>Copy</button>
              {result}
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}


export default App;