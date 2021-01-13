import React, { useState } from "react";

import "./CreateOfferPopup-Style.css";
import "./QuestionPopup-Style.css";
import "./PasswordPopup-Style.css";
import { useForm } from "react-hook-form";
import { createOffer } from "../../utils/apiRequests";
import { getMyOffers } from "../../utils/apiRequests";
import { ErrorMessage } from "@hookform/error-message";
import { store } from "react-notifications-component";
import categoryContext from "../../utils/categoryContext";
import CategoryInput from "../input-components/CategoryInput";
import tagsContext from "../../utils/tagsContext";
import TagsInput from "../input-components/TagsInput";

const CreateOfferPage = ({ hide, setMyOffers }) => {
  const { register, handleSubmit, errors } = useForm({
    // mode: "onBlur",
  });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showSuccess, setSuccess] = useState(false);

  const onSubmit = (data) => {
    data.category = selectedCategory.value;
    console.log("LOL", data);
    let newArray = [];
    selectedTags.forEach((tag) => newArray.push(tag.value));
    data.tags = newArray;

    //eliminar aquellos atributos que sean iguales a ""
    Object.keys(data).forEach(
      (property) => data[property] === "" && delete data[property]
    );

    data.salaryRange = [data.salaryRangeFrom, data.salaryRangeTo];
    delete data["salaryRangeFrom"];
    delete data["salaryRangeTo"];
    if (!data.salaryRange[0] || !data.salaryRange[1]) {
      delete data["salaryRange"];
    }
    console.log("After deletion", data);
    createOffer(data).then((res) => {
      if (res === "success") {
        setSuccess(true);
        store.addNotification({
          title: "Oferta creada exitosamente",
          message: "Su oferta será mostrada a los usuarios en WorKn.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });

        getMyOffers().then((res) => {
          setMyOffers(res.data.data.offers);
        });

        setTimeout(() => {
          hide();
        }, 1500);
      } else {
        store.addNotification({
          title: "Ha ocurrido un error",
          message: res?.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      }
    });
  };

  return (
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <div className="popup-wrapper">
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
            className="sizing-container"
          >
            <div className="create-offer__header">
              <h1 className="create-offer__header-title">
                Creación de ofertas
              </h1>
            </div>
            <div className="create-offer__paired-input">
              <span>Título</span>

              <input
                type="text"
                name="title"
                placeholder="Título"
                title="Por favor, ingrese el título de la oferta"
                ref={register({ required: "Por favor ingrese el titulo" })}
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Descripción</span>

              <textarea
                type="textarea"
                name="description"
                placeholder="Descripción"
                title="Por favor, ingrese la descripción de la oferta"
                className="create-offer__description-input"
                ref={register({ required: "Por favor ingrese la descripcion" })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i className="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__input-row">
              <div className="create-offer__paired-input create-offer__paired-input--half">
                <span>Tipo de oferta</span>

                <select
                  name="offerType"
                  ref={register({
                    required: true,
                  })}
                >
                  <option value="">--Seleccionar--</option>
                  <option value="free">Freelancer</option>
                  <option value="fixed">Fijo/Indefinido</option>
                </select>

                <ErrorMessage
                  errors={errors}
                  name="offerType"
                  message="Por favor, seleccione un tipo de oferta"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
              <div className="create-offer__paired-input create-offer__paired-input--half">
                <span>Fecha de cierre</span>

                <input
                  type="date"
                  name="closingDate"
                  placeholder="Fecha de cierre [opcional]"
                  className="create-offer__date"
                  title="Por favor, ingrese la fecha de cierre de la oferta"
                  ref={register}
                />
              </div>
            </div>

            <div className="create-offer__paired-input">
              <span>Ubicación</span>
              <textarea
                type="textarea"
                name="location"
                placeholder="Localización [opcional]"
                title="Por favor, ingrese la Localización de la oferta [opcional]"
                className="create-offer__description-input"
                ref={register}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>
                Categoría{" "}
                <i className="fa fa-info-circle tooltip">
                  <span className="tooltiptext">
                    Las categorías te permiten filtrar los tags.
                  </span>
                </i>
              </span>
            </div>
            <CategoryInput></CategoryInput>

            <div className="create-offer__paired-input">
              <span>
                Etiquetas{" "}
                <i className="fa fa-info-circle tooltip">
                  <span className="tooltiptext">
                    Son palabras clave que definen las habilidades que buscas
                    para la oferta.
                  </span>
                </i>
              </span>

              <TagsInput
                query={`http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${selectedCategory.value}/tags`}
              ></TagsInput>
            </div>

            <div className="create-offer__paired-input">
              <span>Rango Salarial</span>

              <div className="create-offer__input-row">
                <div className="create-offer__money-range">
                  <input
                    type="number"
                    step="any"
                    name="salaryRangeFrom"
                    placeholder="Desde [opcional]"
                    className="create-offer__salaryRangeFrom c-o__paired-input--money"
                    ref={register}
                    title="Por favor, ingrese el rango inicial sin comas [opcional]"
                  />
                  <span>RD$</span>
                </div>

                <ErrorMessage
                  errors={errors}
                  name="salaryRangeFrom"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />

                <div className="create-offer__money-range">
                  <input
                    type="number"
                    step="any"
                    name="salaryRangeTo"
                    placeholder="Hasta [opcional]"
                    className="create-offer__salaryRangeFrom c-o__paired-input--money"
                    ref={register}
                    title="Por favor, ingrese el rango final [opcional]"
                  />
                  <span>RD$</span>
                </div>

                <ErrorMessage
                  errors={errors}
                  name="salaryRangeTo"
                  render={({ message }) => (
                    <div className="input__msg input__msg--error">
                      <i className="fa fa-asterisk"></i> {message}
                    </div>
                  )}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Crear oferta"
              className="create-offer__submit"
            ></input>

            {showSuccess ? (
              <span className="create-offer__success">
                Oferta creada correctamente, puede cerrar este menu
              </span>
            ) : null}
          </form>
        </div>
      </tagsContext.Provider>
    </categoryContext.Provider>
  );
};

export default CreateOfferPage;
