import Card from 'react-bootstrap/Card';
import {useState} from 'react';

function PlayersCard({name, age, image, stats}) {
    const [isFlipped, setIsFlipped] = useState(true);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
      };
    
    return (
        <div>
        {['Primary'].map((variant) => (
          <Card
            bg={variant.toLowerCase()}
            border="warning"
            key={variant}
            text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem', }}
            className={`mb-2 ${isFlipped ? 'flip' : ''}`}
            onClick={handleClick}
          >
            <div className="front">
            <Card.Header>
                <h2 style={{'text-align': 'center'}}>{name}</h2>
                <p style={{'text-align': 'center'}}>{age} yrs old</p></Card.Header>
            <Card.Body>
              <Card.Title>
                <h2 style={{'text-align': 'center'}}>Stats:</h2>
              </Card.Title>
              <Card.Text>
                <h5 style={{'text-align': 'center'}}>MP: {stats.MP}</h5>
                <h5 style={{'text-align': 'center'}}>Points: {stats.Points}</h5>
                <h5 style={{'text-align': 'center'}}>FG%: {stats.FG} | eFG%: {stats.eFG}</h5>
                <h5 style={{'text-align': 'center'}}>3P%: {stats.threeP} | 2P%: {stats.twoP}</h5>
              </Card.Text>
            </Card.Body>
            </div>
            <div className="back" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{'text-align': 'center', marginBottom: '0.5rem' }}>{name}</h2>
          <img src={image} alt={name} className="back-image" />
        </div>
          </Card>
        ))}
    </div>
    )
}

export default PlayersCard 