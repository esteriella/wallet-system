import axios from 'axios';
import { useFormik } from 'formik';

function WalletCreationForm() {
  const formik = useFormik({
    initialValues: {
      userId: '',
      balance: 0,
    },
    validate: values => {
      const errors = {};
      if (!values.userId) {
        errors.userId = 'Required';
      }
      if (values.balance < 0) {
        errors.balance = 'Must be greater than or equal to 0';
      }
      return errors;
    },
    onSubmit: values => {
      axios.post('/wallet', values)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        User ID:
        <input type="text" {...formik.getFieldProps('userId')} />
        {formik.touched.userId && formik.errors.userId ? <div>{formik.errors.userId}</div> : null}
      </label>
      <label>
        Initial Balance:
        <input type="number" {...formik.getFieldProps('balance')} />
        {formik.touched.balance && formik.errors.balance ? <div>{formik.errors.balance}</div> : null}
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default WalletCreationForm;
