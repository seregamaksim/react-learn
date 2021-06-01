import { Form, Field } from 'react-final-form';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { addUser } from '../app/reducers/Users';
import { YMaps, Map } from 'react-yandex-maps';

const Modal = styled.div`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.33);
  /* transition: all 0.3s ease; */
`;
const ModalWrapper = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* transform: translateY(20px); */
  /* transition: all 0.3s ease; */
`;
const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn('#ffffff', '#d5d5d5')} color: #555;
`;

const btnPrimary = btn('#4f93ce', '#285f8f');

const Styles = styled.div`
  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  form {
    max-width: 500px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        display: flex;
        justify-content: space-between;
        color: #333;
        width: 100%;

        font-size: 1em;
        line-height: 32px;
        span {
          display: block;
          min-width: 90px;
          margin-right: 20px;
        }
        input,
        select {
          flex-grow: 1;
        }
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }
    button {
      margin: 0 10px;
      &[type='submit'] {
        ${btnPrimary};
      }
      &[type='button'] {
        ${btnDefault};
      }
    }
    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// interface FormValues {
//   id: number,
//   name: string,
//   email: string,
//   phone: string,
//   website: string,
//   city: string,
//   companyName: string
// }
const onSubmit = async (values, dispatch) => {
  let request = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=f00883a3-bd7d-4007-a65b-4754989e662c&format=json&geocode=${values.city}`
  );
  let dataRequest = await request.json();
  let position =
    dataRequest.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
      ' '
    );
  let userData = {
    id: values.id,
    name: values.name,
    email: values.email,
    phone: values.phone,
    website: values.website,
    address: {
      geo: {
        lat: Number(position[1]),
        lng: Number(position[0]),
      },
    },
    company: {
      name: values.companyName,
    },
  };
  dispatch(addUser(userData));
};

export default function AddUserModal(props) {
  const dispatch = useDispatch();

  return (
    <Modal open={props.open}>
      <ModalWrapper>
        <button onClick={() => props.closeEvent(false)}>X</button>
        <Styles>
          <Form
            onSubmit={(e) => onSubmit(e, dispatch)}
            initialValues={{ id: getRandomIntInclusive(0, 1000) }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="id"
                  component="input"
                  className="visually-hidden"
                />
                <div>
                  <label>
                    <span>Full name</span>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Full name"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Email</span>
                    <Field
                      name="email"
                      component="input"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Phone</span>
                    <Field
                      name="phone"
                      component="input"
                      type="tel"
                      placeholder="Phone"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Website</span>
                    <Field
                      name="website"
                      component="input"
                      type="text"
                      placeholder="Website"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Company name</span>
                    <Field
                      name="companyName"
                      component="input"
                      type="text"
                      placeholder="Company name"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>City</span>
                    <Field
                      name="city"
                      component="input"
                      type="text"
                      placeholder="City"
                      required
                    />
                  </label>
                </div>
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </Styles>
      </ModalWrapper>
    </Modal>
  );
}
