import PlayersCard from './PlayersCard'

function PlayersList({players, setPlayers}) {
    return (
        <>
        <div class="wrapper">
        <div class="container">
            <h1>We are the NY Knicks!</h1>
        </div>
    </div>
        <div className="playercards">
            {players.map((player) => {
                return <PlayersCard 
                        {...player}
                        key={player.id}
                        setPlayers={setPlayers}/>
            })}
        </div>
        </>
    )
}

export default PlayersList