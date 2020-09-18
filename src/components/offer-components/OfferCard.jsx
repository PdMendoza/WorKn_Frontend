import React from "react";
import Tag from "../tag-components/Tag";
import "./OfferCard-Style.css";
import { useModal } from "../../hooks/useModal";
import DetailPopup from "../../components/popup-components/DetailPopup";
const OfferCard = ({ responseInfo }) => {
  const {
    show: showDetailModal,
    RenderModal: DetailModal,
    // hide: hideQuestionModal,
  } = useModal();
  return (
    <div>
      <DetailModal>
        <DetailPopup responseInfo={responseInfo}></DetailPopup>
      </DetailModal>
      <div className="offercard__wrapper" onClick={showDetailModal}>
        <div className="offercard__header">
          <img
            src={responseInfo?.organization.profilePicture}
            alt="misco"
            className="offercard__picture"
          ></img>
          <div className="offercard__text">
            <span className="offercard__text--title">
              {" "}
              {responseInfo?.title}
            </span>
            <span className="offercard__text--subtitle">
              Por{" "}
              <span className="offercard__text--highlight">
                {responseInfo?.organization.name}
              </span>{" "}
              en{" "}
              <span className="offercard__text--highlight">Santo Domingo</span>
            </span>
          </div>
        </div>
        <div className="offercard__data">
          {responseInfo?.offerType}
          <div className="offercard__vl"></div>
          <span>{responseInfo?.closingDate.slice(0, 10)}</span>
          <div className="offercard__vl"></div>
          <span>{responseInfo?.category.name}</span>
        </div>
        <div className="offercard__tags">
          {responseInfo?.tags.map((tag) => (
            <Tag
              key={tag.id}
              text={tag.name}
              theme="tag tag__text tag__text--gray"
            ></Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
