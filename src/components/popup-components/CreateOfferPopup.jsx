import React, { useState, useRef, useEffect } from "react";

import "./CreateOfferPopup-Style.css";

import { useForm } from "react-hook-form";

import { useStateMachine } from "little-state-machine";

import { createOffer } from "../../utils/apiRequests";

import { ErrorMessage } from "@hookform/error-message";

import categoryContext from "../../utils/categoryContext";
import CategoryInput from "../input-components/CategoryInput";
import tagsContext from "../../utils/tagsContext";
import TagsInput from "../input-components/TagsInput";
import Tag from "../tag-components/Tag";

const CreateOfferPage = ({ hide }) => {
  const { register, handleSubmit, errors } = useForm({
    // mode: "onBlur",
  });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showSuccess, setSuccess] = useState(false);

  //aniadir manualmente los atributos para asuntos de pruebas

  const onSubmit = (data) => {
    // data.category = "5f5188eedee0fc8c9c91e829";
    // data.tags = [
    //   "5f518b2c47667760a0c79ef5",
    //   "5f518b3d1f33143b50ff0614",
    //   "5f518b450368007bf46c862b",
    // ];
    console.log("SUBMITTED");
    data.category = selectedCategory.value;
    console.log(data.category);
    let newArray = [];
    selectedTags.forEach((tag) => newArray.push(tag.value));
    data.tags = newArray;

    //eliminar aquellos atributos que sean iguales a ""
    Object.keys(data).forEach(
      (property) => data[property] == "" && delete data[property]
    );

    data.salaryRange = [data.salaryRangeFrom, data.salaryRangeTo];
    delete data["salaryRangeFrom"];
    delete data["salaryRangeTo"];
    if (!data.salaryRange[0] || !data.salaryRange[1]) {
      delete data["salaryRange"];
    }
    createOffer(data).then((res) => {
      console.log(res);
      if (res == "success") {
        setSuccess(true);
      }
    });
    console.log(data);
  };

  return (
    <categoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      <tagsContext.Provider value={{ selectedTags, setSelectedTags }}>
        <div className="create-offer__container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="create-offer__form"
          >
            <div className="create-offer__header">
              <h1 className="create-offer__header-title">
                Creacion de ofertas
              </h1>
              <i
                className="fa fa-times offerstrip__icon offerstrip__delete"
                onClick={hide}
              ></i>
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
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Descripción</span>

              <input
                type="text"
                name="description"
                placeholder="Descripción"
                title="Por favor, ingrese la descripción de la oferta"
                ref={register({ required: "Por favor ingrese la descripcion" })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Tipo de oferta</span>

              <select
                name="offerType"
                ref={register({
                  required: "Por favor seleccione un tipo de oferta",
                })}
              >
                <option value="free">Free</option>
                <option value="fixed">Fixed</option>
              </select>

              <ErrorMessage
                errors={errors}
                name="offerType"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Ubicacion</span>

              <input
                type="text"
                placeholder="Ubicacion [opcional]"
                title="Por favor, ingrese la Ubicacion de la oferta [opcional]"
                name="location"
                ref={register}
              />
              <ErrorMessage
                errors={errors}
                name="location"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Category</span>

              {/* <input
                type="text"
                name="category"
                placeholder="Categoria"
                title="Por favor, ingrese la categoria de la oferta"
                ref={register({ required: "Por favor ingrese la categoria" })}
              />
              <ErrorMessage
                errors={errors}
                name="category"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              /> */}
            </div>
            <CategoryInput></CategoryInput>

            <div className="create-offer__paired-input">
              <span>Tags</span>

              {/* <input
                type="text"
                name="tags"
                placeholder="Tags"
                title="Por favor, ingrese los tags de la oferta"
                ref={register({ required: "Por favor ingrese los tags" })}
              />
              <ErrorMessage
                errors={errors}
                name="tags"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              /> */}

              <TagsInput
                query={`http://stagingworknbackend-env.eba-hgtcjrfm.us-east-2.elasticbeanstalk.com/api/v1/categories/${selectedCategory.value}/tags`}
                defaultInputValue={"health"}
              ></TagsInput>
            </div>

            <div className="create-offer__paired-input">
              <span>Rango Salarial</span>

              <input
                type="number"
                step="any"
                name="salaryRangeFrom"
                placeholder="Desde [opcional]"
                ref={register}
                title="Por favor, ingrese el rango inicial sin comas [opcional]"
              />

              <ErrorMessage
                errors={errors}
                name="salaryRangeFrom"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
              <input
                type="number"
                step="any"
                name="salaryRangeTo"
                placeholder="Hasta [opcional]"
                ref={register}
                title="Por favor, ingrese el rango final [opcional]"
              />

              <ErrorMessage
                errors={errors}
                name="salaryRangeTo"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
            </div>
            <div className="create-offer__paired-input">
              <span>Closing Date</span>

              <input
                type="date"
                name="closingDate"
                placeholder="Fecha de cierre"
                ref={register}
                title="Por favor, ingrese la fecha de cierre de la oferta"
              />
              <ErrorMessage
                errors={errors}
                name="closingDate"
                render={({ message }) => (
                  <div className="input__msg input__msg--error">
                    <i class="fa fa-asterisk"></i> {message}
                  </div>
                )}
              />
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
