export default function StatsBar() {
    return (
        <div className="p-16 flex ai-center g-16 w-100 b-bottom">
            <div style={{minWidth:"64px"}}>
                <span style={{display: "inline-block", width: "20px", textAlign: "center"}} className="t-14">#</span>
            </div>
            <div style={{minWidth:"164px"}} className="w-100">
                <span className="t-14">Jour de service</span>
            </div>
            <div style={{minWidth:"256px"}}>
                <span className="t-14">Date d'ajout</span>
            </div>
            <div style={{minWidth:"164px"}}>
                <span className="t-14">Début du service</span>
            </div>
            <div style={{minWidth:"164px"}}>
                <span className="t-14">Fin du service</span>
            </div>
            <div style={{minWidth:"256px"}}>
                <span className="t-14">Durée de la simulation (secondes)</span>
            </div>
        </div>
    )
}