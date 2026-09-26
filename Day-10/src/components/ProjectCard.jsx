import Card from "./Card";
function ProjectCard({ onProjectClick }) {
    function handleClick() {
        onProjectClick("Campus Issue Reporting Portal");
    }
    return (
        <>
            <Card
                title="Project"
                actionText="View Project"
                onAction={handleClick}
            >
                <p>Name: Campus Issue Reporting Portal</p>
                <p>Technology: React + Node.js</p>
            </Card>
        </>
    )
}

export default ProjectCard