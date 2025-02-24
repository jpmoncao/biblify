import { NavigateFunction, Location } from "react-router";

export function backNavigate(navigate: NavigateFunction, location: Location<any>) {
    return location.key != 'default' ? navigate(-1) : navigate("/")
}