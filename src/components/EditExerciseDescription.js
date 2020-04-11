import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ToastContainer, createNotification } from '../components/Toast';
import api from '../apiCalls/api';
export default function EditExercise({ selectedEditExercise, editExerciseModalClose, setEditExerciseData }) {
	console.log(selectedEditExercise);
	const { register, handleSubmit } = useForm();
	const [exercise, setExercise] = useState('');
	const onSubmit = data => {
		api.editExercise(selectedEditExercise, data.description).then(result => {
			if (result.status == 200) {
				console.log(result.data);
				createNotification('success', result.data.message);
				setEditExerciseData(result.data.result);
				editExerciseModalClose();
			} else {
				createNotification('error', result.data.message);
				editExerciseModalClose();
			}
		});
	};
	useEffect(() => {
		api.getExercisesById(selectedEditExercise).then(result => {
			setExercise(result.data);
		});
	}, []);

	const onChange = e => {
		setExercise({ ...exercise, [e.target.name]: e.target.value });
	};

	return (
		<Fragment>
			<ToastContainer />
			<form className="col-sm-12 text-center">
				<h3>Edit Exercise</h3>

				<div className="d-flex">
					<h4>Description</h4>
					<div className="ml-3 mt-2 w-75 h-100">
						<textarea
							className="w-100 h-100 p-0"
							name="description"
							value={exercise.description}
							ref={register}
							onChange={e => onChange(e)}
						/>
					</div>
				</div>
				<div className="col-sm-12 text-center pb-3">
					<button className="btn btn-custom" type="submit" onClick={handleSubmit(onSubmit)}>
						Save
					</button>
				</div>
			</form>
		</Fragment>
	);
}
