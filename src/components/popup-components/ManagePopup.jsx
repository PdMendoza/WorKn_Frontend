import React, { useState } from "react";
import "./QuestionPopup-Style.css";
import "../../App.css";
import { useForm } from "react-hook-form";
import { removeMember, updateMemberRole } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import "./ManagePopup-Style.css";
import "./QuestionPopup-Style.css";

const ManagePopup = () => {
  const [current, setCurrent] = useState("");
  // const [memberId, setMemberId] = useState("");
  const [memberToUpdate, setMemberToUpdate] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const { state } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(memberToUpdate, data.role);
    updateMemberRole(memberToUpdate, data.role).then((res) => {
      if (res.data !== undefined) {
        console.log(res);
        setCurrent(res);
      }
    });
    setIsVisible(false);
  };

  const sendMember = (memberId) => {
    if (window.confirm("Seguro que quiere borrar este usuario?")) {
      removeMember(memberId).then((res) => {
        if (res.data !== undefined) {
          console.log(res);
          setCurrent(res);
        }
      });
    } else {
      console.log("No borrado");
    }
  };

  const toggleEdit = () => {
    setIsVisible(true);
  };

  return (
    <div className="popup-wrapper">
      <form className="sizing-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="members__container">
          <ul className="members__list">
            <span className="members__title">Manejo de miembros</span>
            {state.userInformation.data.members.map((member) => (
              <li className="members__item" key={member._id}>
                <img
                  className="members__profilepic"
                  src={member.profilePicture}
                  alt=""
                />
                <span className="members__fullname">
                  <span className="members__spacer">{member.name}</span>
                  <span className="members__spacer">{member.lastname}</span>
                </span>
                <span className="members__spacer">
                  {member.organizationRole}
                </span>
                <button
                  className="members__action"
                  type="button"
                  onClick={() => {
                    sendMember(member._id);
                  }}
                >
                  Borrar
                </button>
                <button
                  className="members__action"
                  type="button"
                  onClick={() => {
                    toggleEdit();
                    setMemberToUpdate(member._id);
                  }}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>

          {typeof current.data !== "undefined" &&
          current.data.status === "success" ? (
            <div className="input__msg input__msg--success">
              <i class="fa fa-check"></i> Usuario actualizado correctamente
            </div>
          ) : (
            ""
          )}

          {typeof current.data !== "undefined" &&
          current.data.status === "member deleted" ? (
            <div className="input__msg input__msg--success">
              <i className="fa fa-check"></i> Usuario eliminado correctamente
            </div>
          ) : (
            ""
          )}

          {typeof isVisible !== "undefined" && isVisible === true ? (
            <div className="members__update">
              <span className="members__subtitle">Inserte el nuevo rol</span>
              <div className="members__update--inner">
                <select
                  className="form__select"
                  name="role"
                  id="role"
                  ref={register({
                    required: "Por favor ingrese el correo a invitar",
                  })}
                >
                  <option value="member">Miembro</option>
                  <option value="supervisor">Supervisor</option>
                </select>
                <input
                  className="members__button bg-green"
                  type="submit"
                  value="Actualizar"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default ManagePopup;
