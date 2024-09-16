import { useEffect, useState } from "react"
import "./Form.css"
import { updateUser } from "../redux/users/userSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Form() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { edit } = useSelector((state) => state.user);

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    useEffect(() => {
        setInput({
            name: edit.userData?.name,
            email: edit.userData?.email
        })
    }, [edit.isEdit])

    // console.log(input)
    const saveData = (e) => {
        e.preventDefault()
        // console.log(input)
        const update = {
            id: edit.userData.id,
            email: input.email,
            name: input.name,
            password: input.password
        }
        dispatch(updateUser(update))
        navigate("/dashboard")
    }

    return <>

        <form className="centered-form" onSubmit={saveData}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={input.name} onChange={handleInput} placeholder="Enter Name" />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={input.email} onChange={handleInput} placeholder="Enter Email" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={input.password} onChange={handleInput} placeholder="Enter Password" />
            </div>
            <div>
                <button>Update</button>
            </div>
        </form>
    </>
}