import React, { useState, useEffect } from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
// import { useModal } from "../../hooks/useModal";
// import InteractionPopup from "../../components/popup-components/InteractionPopup";
import { useStateMachine } from "little-state-machine";
import { Link } from "react-router-dom";
import updateAction from "../../updateAction";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";

const OfferStrip = ({
  responseInfo,
  isMatch,
  isInteraction,
  interactionId,
}) => {
  // const { show: showDetailModal, RenderModal: DetailModal } = useModal();
  const { state, action } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");

  const sendInteractionId = () => {
    const currentId = { interactionId };
    action(currentId);
  };

  const catchInteraction = () => {
    acceptInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };

  const deleteInteraction = () => {
    rejectInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";

  useEffect(() => {
    if (responseInfo.offer.organization) {
      setProfilePictureRoute(responseInfo?.offer?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.organization?.name);
    } else {
      setProfilePictureRoute(responseInfo?.offer?.createdBy?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.createdBy?.name);
    }
  }, [responseInfo]);

  return (
    <div>
      {/* <DetailModal>
        <InteractionPopup responseInfo={responseInfo}></InteractionPopup>
      </DetailModal> */}
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
      state.userInformation.userType === "" ? (
        <div className="offerstrip">
          <img
            src={profilePictureRoute}
            className="offerstrip__picture"
            alt="Offerpp"
          />
          <span className="offerstrip__text offerstrip__org">
            {offererTitleRoute}
          </span>
          <span className="offerstrip__vl offerstrip__vl--1"></span>
          <span className="offerstrip__text offerstrip__type">
            {MyDictionary[responseInfo?.offer?.offerType]}
          </span>
          <span className="offerstrip__vl offerstrip__vl--2"></span>
          <span className="offerstrip__text offerstrip__offer">
            {responseInfo?.offer?.title}
          </span>
          <span className="offerstrip__vl offerstrip__vl--3"></span>
          <div className="offerstrip__tagscontainer">
            {responseInfo?.offer?.tags?.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
          <span className="offerstrip__vl offerstrip__vl--4"></span>
          {typeof isMatch !== "undefined" && isMatch === "true" ? (
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <button
                onClick={sendInteractionId}
                className="offerstrip__action offerstrip__action--green"
              >
                <i className="fa fa-comments userprofile__icon"></i>
                Chat
              </button>
            </Link>
          ) : (
            ""
            // <span className="offerstrip__text offerstrip__edit">Editar</span>
          )}
          {typeof isInteraction !== "undefined" && isInteraction === "true" ? (
            <React.Fragment>
              <button
                onClick={catchInteraction}
                className="offerstrip__action offerstrip__action--green"
              >
                <i className="fa fa-check userprofile__icon"></i>
                Aceptar
              </button>
              {/* <Link to="/chat" style={{ textDecoration: "none" }}> */}
              <button
                onClick={deleteInteraction}
                className="offerstrip__action offerstrip__action--red"
              >
                <i className="fa fa-times userprofile__icon"></i>
                Declinar
              </button>
              {/* </Link> */}
            </React.Fragment>
          ) : (
            ""
          )}
          <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
        </div>
      ) : (
        <div className="offerstrip">
          <img
            src={responseInfo?.applicant?.profilePicture}
            className="offerstrip__picture"
            alt="Offerpp"
          />
          <span className="offerstrip__text offerstrip__org">
            {responseInfo?.applicant?.category?.name}
          </span>
          <span className="offerstrip__vl offerstrip__vl--1"></span>
          <span className="offerstrip__text offerstrip__type">
            {responseInfo?.applicant?.email}
          </span>
          <span className="offerstrip__vl offerstrip__vl--2"></span>
          <span className="offerstrip__text offerstrip__offer">
            {responseInfo?.applicant?.name} {responseInfo?.applicant?.lastname}
          </span>
          <span className="offerstrip__vl offerstrip__vl--3"></span>
          <div className="offerstrip__tagscontainer">
            {responseInfo?.applicant?.tags?.map((tag) => (
              <Tag
                key={tag.id}
                text={tag.name}
                theme="tag tag__text tag__text--gray"
              ></Tag>
            ))}
          </div>
          <span className="offerstrip__vl offerstrip__vl--4"></span>
          {typeof isMatch !== "undefined" && isMatch === "true" ? (
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <button
                onClick={sendInteractionId}
                className="offerstrip__action offerstrip__action--green"
              >
                <i className="fa fa-comments userprofile__icon"></i>
                Chat
              </button>
            </Link>
          ) : (
            ""
            // <span className="offerstrip__text offerstrip__edit">Editar</span>
          )}
          {typeof isInteraction !== "undefined" && isInteraction === "true" ? (
            <React.Fragment>
              <button
                onClick={catchInteraction}
                className="offerstrip__action offerstrip__action--green"
              >
                <i className="fa fa-check userprofile__icon"></i>
                Aceptar
              </button>
              {/* <Link to="/chat" style={{ textDecoration: "none" }}> */}
              <button
                onClick={deleteInteraction}
                className="offerstrip__action offerstrip__action--red"
              >
                <i className="fa fa-times userprofile__icon"></i>
                Declinar
              </button>
              {/* </Link> */}
            </React.Fragment>
          ) : (
            ""
          )}

          <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
        </div>
      )}
    </div>
  );
};

export default OfferStrip;
