import { useEffect, useState } from "react";
import supabase from "../../../superbaseClient";

import { GrWorkshop } from "react-icons/gr";
import { FaHouse } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { GiTeacher } from "react-icons/gi";
import { MdAssistantPhoto } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

import "./Formation.css";

function Formation() {
  const [seniorMembers, setSeniorMembers] = useState([{}]);
  const [formData, setFormData] = useState({
    titre: "",
    domaine: "",
    local: "",
    date: "",
    tutor: 0,
    tutorAssistants: [],
    receptionists: [],
    coffeeBreaksAssistants: [],
    logo: "./images/CpuBlack.png",
  });

  useEffect(() => {
    const fetchFormateurs = async () => {
      try {
        const { data: senior_members, error } = await supabase
          .from("senior_members")
          .select("*");

        if (error) {
          console.log("Error fetching formateurs", error.message);
          return [];
        }
        return senior_members;
      } catch (err) {
        console.error('Error fetching data:', err);
        return [{}];
      }
    };
    async function getFormateurs() {
      const senior_members = await fetchFormateurs();
      setSeniorMembers(senior_members);
    }

    getFormateurs();
  }, []);

  const handleTutorChange = (e) => {
    setFormData({ ...formData, tutor: e.target.value });
  };

  const handleAssistantAdd = () => {
    setFormData({
      ...formData,
      tutorAssistants: [...formData.tutorAssistants, { id: formData.tutorAssistants.length + 1, value: "" }],
    });
  };

  const handleAssistantChange = (index, e) => {
    const updatedAssistants = formData.tutorAssistants.map((tutorAssistant, i) =>
      i === index ? { ...tutorAssistant, value: e.target.value } : tutorAssistant
    );
    setFormData({ ...formData, tutorAssistants: updatedAssistants });
  };

  const handleDeleteAssistant = (index) => {
    const updatedAssistants = formData.tutorAssistants.filter((_, i) => i !== index);
    setFormData({ ...formData, tutorAssistants: updatedAssistants });
  };

  const handleReceptionistAdd = () => {
    setFormData({
      ...formData,
      receptionists: [...formData.receptionists, { id: formData.receptionists.length + 1, value: "" }],
    });
  };

  const handleReceptionistChange = (index, e) => {
    const updatedReceptionists = formData.receptionists.map((receptionist, i) =>
      i === index ? { ...receptionist, value: e.target.value } : receptionist
    );
    setFormData({ ...formData, receptionists: updatedReceptionists });
  };

  const handleReceptionistDelete = (index) => {
    const updatedReceptionists = formData.receptionists.filter((_, i) => i !== index);
    setFormData({ ...formData, receptionists: updatedReceptionists });
  };

  const handleCoffeeBreaksAssistantsAdd = () => {
    setFormData({
      ...formData,
      coffeeBreaksAssistants: [...formData.coffeeBreaksAssistants, { id: formData.coffeeBreaksAssistants.length + 1, value: "" }],
    });
  };

  const handleCoffeeBreaksAssistantsChange = (index, e) => {
    const updatedCoffeeBreaksAssistants = formData.coffeeBreaksAssistants.map((coffeeBreakAssistant, i) =>
      i === index ? { ...coffeeBreakAssistant, value: e.target.value } : coffeeBreakAssistant
    );
    setFormData({ ...formData, coffeeBreaksAssistants: updatedCoffeeBreaksAssistants });
  };

  const handleCoffeeBreaksAssistantsDelete = (index) => {
    const updatedCoffeeBreaksAssistants = formData.coffeeBreaksAssistants.filter((_, i) => i !== index);
    setFormData({ ...formData, coffeeBreaksAssistants: updatedCoffeeBreaksAssistants });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const { data, error } = await supabase
        .from("trainings")
        .insert([
          {
            tutor_id: formData.tutor,
            training_branch: formData.domaine,
            name: formData.titre,
            description: "Description about the training", // Add appropriate description
            date: formData.date,
            type: formData.domaine,
            address: formData.local,
            logo_url: formData.logo,
          },
        ]);

      if (error) {
        console.error("Error adding training:", error.message);
      } else {
        alert("Training added successfully!");
        console.log("Training added successfully!", data);
      }
    } catch (err) {
      console.error("Error adding training:", err);
    }
  };


  return (
    <div className="Formulaire">
      <form onSubmit={handleSubmit}>
        <h1 className="Formation-title">Formulaire Du Formation</h1>

        <div className="Field">
          <label>Titre de formation {<GrWorkshop />} :</label>
          <input
            type="text"
            value={formData.titre}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
          />
        </div>

        <div className="Field">
          <label>Domaine de formation:</label>
          <div style={{ display: "flex", gap: "5%" }}>
            <div>
              <label>
                <input
                  type="radio"
                  name="domaine"
                  value="dev"
                  checked={formData.domaine === "dev"}
                  onChange={() => setFormData({ ...formData, domaine: "dev" })}
                />
                Développement {<FaCode />}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="domaine"
                  value="robotique"
                  checked={formData.domaine === "Robotique"}
                  onChange={() => setFormData({ ...formData, domaine: "robotique" })}
                />
                Robotique {<RiRobot2Fill />}
              </label>
            </div>
          </div>
        </div>

        <div className="Field">
          <label>Local {<FaHouse />} :</label>
          <input
            type="text"
            value={formData.local}
            onChange={(e) => setFormData({ ...formData, local: e.target.value })}
          />
        </div>

        <div className="Field">
          <label>Date {<CiCalendarDate />} :</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        {/* Formateur Section */}
        <div className="Field">
          <label>Formateur {<GiTeacher />} :</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select
              value={formData.tutor}
              onChange={handleTutorChange}
            >
              <option value="default">Select Formateur</option>
              {seniorMembers.map((seniorMember) => (
                <option key={seniorMember.id} value={seniorMember.id}>
                  {seniorMember?.firstname} {seniorMember?.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assistant Section */}
        <div className="Field">
          <label>Assistants {<MdAssistantPhoto />} :</label>
          {formData.tutorAssistants.map((tutorAssistant, index) => (
            <div key={index}>
              <select
                value={tutorAssistant.value}
                onChange={(e) => handleAssistantChange(index, e)}
              >
                <option value="default">Select Assistants</option>
                {seniorMembers.map((seniorMember) => (
                  <option key={seniorMember.id} value={seniorMember.id}>
                    {seniorMember?.firstname} {seniorMember?.lastname}
                  </option>
                ))}
              </select>
              <button type="button" disabled={formData.tutorAssistants.length === 1} onClick={() => handleDeleteAssistant(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={handleAssistantAdd}>Add Tutor Assistant</button>
        </div>

        {/* Reception Section */}
        <div className="Field">
          <label>Reception {<FaPersonCircleCheck />} :</label>
          {formData.receptionists.map((receptionist, index) => (
            <div key={index}>
              <select
                value={receptionist.value}
                onChange={(e) => handleReceptionistChange(index, e)}
              >
                <option value="default">Select Receptionists</option>
                {seniorMembers.map((seniorMember) => (
                  <option key={seniorMember.id} value={seniorMember.id}>
                    {seniorMember?.firstname} {seniorMember?.lastname}
                  </option>
                ))}
              </select>
              <button type="button" disabled={formData.receptionists.length === 1} onClick={() => handleReceptionistDelete(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={handleReceptionistAdd}>Add Receptionist</button>
        </div>

        {/* Pause Café Section */}
        <div className="Field">
          <label>Pause Café {<FaCoffee />} :</label>
          {formData.coffeeBreaksAssistants.map((coffeeBreakAssistant, index) => (
            <div key={index}>
              <select
                value={coffeeBreakAssistant.value}
                onChange={(e) => handleCoffeeBreaksAssistantsChange(index, e)}
              >
                <option value="default">Select Coffee Break Assistant</option>
                {seniorMembers.map((seniorMember) => (
                  <option key={seniorMember.id} value={seniorMember.id}>
                    {seniorMember?.firstname} {seniorMember?.lastname}
                  </option>
                ))}
              </select>
              <button type="button" disabled={formData.coffeeBreaksAssistants.length === 1} onClick={() => handleCoffeeBreaksAssistantsDelete(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={handleCoffeeBreaksAssistantsAdd}>Add Coffee Break Assistant</button>
        </div>

        {formData.logo && (
          <div className="Field">
            <h3>Prévisualisation du logo :</h3>
            <img
              src={formData.logo}
              alt="Logo Preview"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        )}

        <div className="Field" style={{ gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>

        </div>
      </form>
    </div>
  );
}

export default Formation;