import React, { useState, useEffect, Fragment } from 'react';
import AddAssignedExcercise from './AddAssignedExcercise';
import AddExcercise from './AddExercise';
import Model from './Model';
import api from '../apiCalls/api';

import AddAppointment from './AddAppointment';

export const Appointments = ({ title, row = false, modelId = '', selectedClientId }) => {
	const [getAllAppointement, setAllAppointement] = useState([]);
	const [show, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const openModal = () => {
		setShowModal(true);
	};

	useEffect(() => {
		api.getAppointmentById(selectedClientId).then(Appointement => {
			setAllAppointement(Appointement.data);
		});
	}, [selectedClientId]);
	console.log('getAllAppointement');
	console.log(selectedClientId);
	const setNewAppointmentData = response => {
		setAllAppointement([...getAllAppointement, response.Appointment]);
		handleClose();
	};

	return (
		<Fragment>
			<Model show={show} title={title} handleClose={handleClose}>
				<AddAppointment setNewAppointmentData={setNewAppointmentData} selectedClientId={selectedClientId} />;
			</Model>
			<h3 className="custom-active font-weight-bold mb-0 pl-0">{title}</h3>
			<div className={`col-md-12 d-flex overflow-auto p-0  ${row ? `flex-row` : `flex-wrap`}`}>
				{getAllAppointement.map((appoint, index) => (
					<div
						className="appointment-circle background-grey shadow border img-circle d-flex justify-content-center align-items-center m-2 background-active "
						key={index}
					>
						<span className="p-3 text-center text-light">
							{`${new Date(appoint.date).getDate()}/${new Date(appoint.date).getMonth() + 1}/${new Date(
								appoint.date
							).getFullYear()}`}
						</span>
					</div>
				))}

				<div
					className="appointment-circle border-grey-5 shadow border img-circle d-flex justify-content-center align-items-center m-2"
					type="button"
					onClick={openModal}
				>
					<i className="fas fa-plus text-muted font-36px " />
				</div>
			</div>
		</Fragment>
	);
};