import React, { useState, useContext, useEffect } from "react";
import "../../styles/styles.scss";
import { useParams } from "react-router";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { CreateCustomCharacter } from "./createCharacter";
import { TextareaInput } from "../component/textareaInput";
import { StepProgressTrack } from "../component/stepProgressTrack";
import { ProgressTrack } from "../component/progressTrack";

export const CreateCustomCharacterForm = () => {
	const { actions, store } = useContext(Context);
	let { fav_character } = useParams();
	const [character, setCharacter] = useState({
		name: "",
		nickname: "",
		age: "",
		occupation: "",
		nationality: "",
		eye_color: "",
		hair_color: "",
		skin_color: "",
		gender: "",
		sexual_orientation: "",
		personality: "",
		appearence: ""
	});

	useEffect(() => {
		if (fav_character !== undefined) {
			handleGetDataFavoriteCharacter(fav_character);
		}
	}, []);

	const handleGetDataFavoriteCharacter = async id => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/favoritecharacters/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: token }
		});
		if (resp.ok) {
			const data = await resp.json();
			let old_character = { ...character };
			old_character["age"] = data.age;
			old_character["name"] = `${data.name} ${data.last_name}`;
			old_character["occupation"] = data.occupation;
			old_character["personality"] = data.personality_desc;
			old_character["gender"] = data.gender;
			setCharacter(old_character);
		}
	};

	const handleCreateCharacter = async () => {
		const token = actions.getUserToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/create-character`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: token },
			body: JSON.stringify({ character: character })
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.setToast("success", data.msg);
		} else {
			actions.setToast("warning", resp.msg);
		}
	};

	const updateValue = (attr, value) => {
		let old_character = { ...character };
		old_character[attr] = value;
		setCharacter(old_character);
	};

	const progressOne = (
		<ProgressTrack>
			<StepProgressTrack icon="fas fa-info" text="General Info" isActive={true} />
			<StepProgressTrack icon="fa fa-user" text="Personality" isActive={false} />
			<StepProgressTrack icon="fas fa-tshirt" text="Appearence" isActive={false} />
		</ProgressTrack>
	);
	const progressTwo = (
		<ProgressTrack>
			<StepProgressTrack icon="fas fa-info" text="General Info" isActive={true} />
			<StepProgressTrack icon="fa fa-user" text="Personality" isActive={true} />
			<StepProgressTrack icon="fas fa-tshirt" text="Appearence" isActive={false} />
		</ProgressTrack>
	);
	const progressThree = (
		<ProgressTrack>
			<StepProgressTrack icon="fas fa-info" text="General Info" isActive={true} />
			<StepProgressTrack icon="fa fa-user" text="Personality" isActive={true} />
			<StepProgressTrack icon="fas fa-tshirt" text="Appearence" isActive={true} />
		</ProgressTrack>
	);

	const index = (
		<div className="row align-items-center">
			<div className="col-lg-10 col-xl-9 mx-auto">
				<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
					<div className="card-body p-4 p-sm-5">
						<h1 className="card-title text-center mb-3 text-uppercase fs-3 text-prin">
							Build Custom Character
						</h1>
					</div>
				</div>
			</div>
		</div>
	);

	const generalInfo = (
		<CreateCustomCharacter title="General Information" id="general" progressBar={progressOne}>
			<NormalInput type="text" id="name" placeholder="Full Name" set={updateValue} value={character.name} />
			<div className="row">
				<div className="col-12 col-md-6">
					<NormalInput
						type="text"
						id="nickname"
						placeholder="Nickname"
						set={updateValue}
						value={character.nickname}
					/>
				</div>
				<div className="col-12 col-md-6">
					<NormalInput type="number" id="age" placeholder="Age" set={updateValue} value={character.age} />
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-6">
					<NormalInput
						type="text"
						id="occupation"
						placeholder="Occupation"
						set={updateValue}
						value={character.occupation}
					/>
				</div>
				<div className="col-12 col-md-6">
					<NormalInput
						type="text"
						id="nationality"
						placeholder="Nationality"
						set={updateValue}
						value={character.nationality}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-6">
					<NormalInput
						type="text"
						id="gender"
						placeholder="Gender"
						set={updateValue}
						value={character.gender}
					/>
				</div>
				<div className="col-12 col-md-6">
					<NormalInput
						type="text"
						id="sexual_orientation"
						placeholder="Sexual Orientation"
						set={updateValue}
						value={character.sexual_orientation}
					/>
				</div>
			</div>
		</CreateCustomCharacter>
	);

	const personalityInfo = (
		<CreateCustomCharacter title="Personality" id="personality" progressBar={progressTwo}>
			<TextareaInput
				id="personality"
				placeholder="Personality Description"
				set={updateValue}
				value={character.personality}
			/>
		</CreateCustomCharacter>
	);

	const appearenceInfo = (
		<CreateCustomCharacter title="Physical Appearence" id="appearence" progressBar={progressThree}>
			<NormalInput
				type="text"
				id="eye_color"
				placeholder="Eye Color"
				set={updateValue}
				value={character.eye_color}
			/>
			<NormalInput
				type="text"
				id="hair_color"
				placeholder="Hair color"
				set={updateValue}
				value={character.hair_color}
			/>
			<NormalInput
				type="text"
				id="skin_color"
				placeholder="Skin Color"
				set={updateValue}
				value={character.skin_color}
			/>
			<TextareaInput id="appearence" placeholder="Extra Info" set={updateValue} value={character.appearence} />
		</CreateCustomCharacter>
	);

	return (
		<div className="container-fluid m-0 bg-gradiente">
			{index}
			{generalInfo}
			{personalityInfo}
			{appearenceInfo}

			<div className="row align-items-center">
				<div className="col-lg-10 col-xl-9 mx-auto">
					<div className="card flex-row my-3 border-0 shadow rounded-3 overflow-hidden">
						<div className="card-body p-4 p-sm-5">
							<div className="d-flex my-3 justify-content-center">
								<button
									onClick={handleCreateCharacter}
									className="btn btn-prin fw-bold text-uppercase w-50 p-2">
									Save Character
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
