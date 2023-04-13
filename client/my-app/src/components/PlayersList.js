import PlayersCard from './PlayersCard'

function PlayersList({players, setPlayers}) {
    return (
        <div className="playercards">
            {players.map((player) => {
                return <PlayersCard 
                        {...player}
                        key={player.id}
                        setPlayers={setPlayers}/>
            })}
        </div>
    )
}

export default PlayersList