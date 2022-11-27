export default function SubjectiveTable(props) {

    return (
        <div>
            {props.num}번
            <br />
            {JSON.stringify(props.value)}
        </div>
    )
}