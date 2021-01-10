import React from "react";
import "./CustomOfferStrip-Style.css";
import Tag from "../tag-components/Tag";
import { useModal } from "../../hooks/useModal";
import OfferPopup from "../popup-components/OfferPopup";
import EditOfferPopup from "../popup-components/EditOfferPopup";
import DeleteOfferPopup from "../popup-components/DeleteOfferPopup";
import { Scrollbars } from "react-custom-scrollbars";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const CustomOfferStrip = ({
  offerInfo,
  organizationInformation,
  isInactive,
  setMyOffers,
}) => {
  const {
    show: showOfferModal,
    RenderModal: OfferModal,
    hide: hideOfferModal,
  } = useModal();
  const {
    show: showEditOfferModal,
    RenderModal: EditOfferModal,
    hide: hideEditOfferModal,
  } = useModal();
  const {
    show: showDeleteOfferModal,
    RenderModal: DeleteOfferModal,
    hide: hideDeleteOfferModal,
  } = useModal();
  //optional chanining JS, o si
  // chekear si offer.
  let shortOfferDescription = "";
  let shortOfferTitle = "";
  shortOfferTitle = offerInfo.title;
  shortOfferDescription = offerInfo.description;

  if (offerInfo.description.length > 43) {
    shortOfferDescription = `${shortOfferDescription.slice(0, 44)}...`;
  }

  if (offerInfo.title.length > 38) {
    shortOfferTitle = `${shortOfferTitle.slice(0, 39)}...`;
  }

  return isInactive ? (
    <div className="offerstrip">
      <OfferModal>
        <OfferPopup
          offerInfo={offerInfo}
          organizationInformation={organizationInformation}
          hide={hideOfferModal}
        />
      </OfferModal>

      {organizationInformation?.profilePicture ? (
        <img
          src={organizationInformation.profilePicture}
          className="offerstrip__picture"
          alt="Offerpp"
        />
      ) : (
          <img
            src="https://i.imgur.com/lcHQ2QP.jpg"
            className="offerstrip__picture"
            alt="Offerpp"
          />
        )}

      <span
        className="offerstrip__text offerstrip__type"
        onClick={showOfferModal}
      >
        {offerInfo ? shortOfferTitle : "Titulo no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--1"></span>
      <span className="offerstrip__text offerstrip__org">
        {offerInfo ? MyDictionary[offerInfo.offerType] : "Info no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--2"></span>
      <span className="offerstrip__text offerstrip__offer">
        {offerInfo ? shortOfferDescription : "Descripcion no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--3"></span>
      <Scrollbars
        style={{ width: 350, height: 35 }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <div className="offerstrip__tagscontainer offerstrip__tagscontainer--inactive">
          {offerInfo.tags.map((tag) => (
            <Tag
              key={tag._id}
              text={tag.name}
              theme="tag tag__text tag__text--gray"
            ></Tag>
          ))}
        </div>
      </Scrollbars>
    </div>
  ) : (
      <div className="offerstrip">
        <OfferModal>
          <OfferPopup
            offerInfo={offerInfo}
            organizationInformation={organizationInformation}
            hide={hideOfferModal}
          />
        </OfferModal>

        {organizationInformation?.profilePicture ? (
          <img
            src={organizationInformation.profilePicture}
            className="offerstrip__picture"
            alt="Offerpp"
          />
        ) : (
            <img
              src="https://i.imgur.com/lcHQ2QP.jpg"
              className="offerstrip__picture"
              alt="Offerpp"
            />
          )}

        <span
          className="offerstrip__text offerstrip__type"
          onClick={showOfferModal}
        >
          {offerInfo ? shortOfferTitle : "Titulo no disponible"}
        </span>
        <span className="offerstrip__vl offerstrip__vl--1"></span>
        <span className="offerstrip__text offerstrip__org">
          {offerInfo ? MyDictionary[offerInfo.offerType] : "Info no disponible"}
        </span>
        <span className="offerstrip__vl offerstrip__vl--2"></span>
        <span className="offerstrip__text offerstrip__offer">
          {offerInfo ? shortOfferDescription : "Descripcion no disponible"}
        </span>
        <span className="offerstrip__vl offerstrip__vl--3"></span>
        <Scrollbars
          style={{ width: 300, height: 35 }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <div className="offerstrip__tagscontainer">
            {offerInfo.tags.map((tag) => (
              <Tag
                key={tag._id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
        </Scrollbars>

        <span className="offerstrip__vl offerstrip__vl--4"></span>
        <EditOfferModal>
          <EditOfferPopup
            hide={hideEditOfferModal}
            offerInfo={offerInfo}
            setMyOffers={setMyOffers}
          ></EditOfferPopup>
        </EditOfferModal>
        <span
          className="offerstrip__text offerstrip__edit"
          onClick={isInactive ? () => { } : showEditOfferModal}
        >
          Editar
      </span>
        <i
          className="fa fa-times offerstrip__icon offerstrip__delete"
          onClick={showDeleteOfferModal}
        ></i>
        <DeleteOfferModal>
          <DeleteOfferPopup
            offerInfo={offerInfo}
            hide={hideDeleteOfferModal}
            setMyOffers={setMyOffers}
          />
        </DeleteOfferModal>
      </div>
    );
};

export default CustomOfferStrip;
