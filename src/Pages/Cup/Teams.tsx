import React, { useState, useEffect } from 'react'
import { IonItem, IonLabel, IonList, IonIcon, IonRow, IonCol, IonChip, IonGrid, IonCard, IonCardTitle, IonCardContent, IonButton, IonAlert, IonContent, IonFab, IonFabButton, IonInfiniteScroll, IonInfiniteScrollContent, IonCardHeader, IonImg, } from '@ionic/react'
import "./Teams.css"
import { football, man, body, sad, location, key, handLeft, add } from 'ionicons/icons'
import { writeCsvFile } from './StatCsv';
import { createTeam } from '../../util/firestore';


interface ListPartida {
  list: any[],
  keyCup: string,
  popover: boolean,
  handlePopoverDismiss: Function
}

const Teams: React.FC<ListPartida> = ({ list, keyCup, popover, handlePopoverDismiss }) => {


  const [teamName, setTeamName] = useState("");
  const [players, setPlayer] = useState<string[]>([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorTipoAlert, setErrorTipoAlert] = useState(0);
  const errorDescricao = ["Cabracho Faltou o nome do Time", "Juliette avisou que tem jogador repetido", "Precisa de jogadores na equipe"]

  useEffect(() => {
    setPlayer([]);
  }, [])

  const handleTeamCreated = (data: any): any => {
    const newPlayers: string[] = []
    let teamN = ""
    for (const [k, v] of Object.entries(data)) {
      if (k === "nameTime") {
        if (!v || v === '') return 0;
        teamN = v as string;
        setTeamName(v as string);
        continue;
      }

      if (!v || v === "") continue;

      if (newPlayers.find(el => el === v)) return 1;

      newPlayers.push(v as string);
    }
    if (!newPlayers.length) return 2;

    setPlayer(newPlayers);

    return {teamName: teamN, players: newPlayers};
  }

  return (
    <div>

      <IonAlert
        isOpen={popover}
        onDidDismiss={() => handlePopoverDismiss()}
        cssClass='alert-teams'
        header={'Adicionar Time'}
        message={'Até no máximo 10 jogadores'}
        inputs={[{
          name: 'nameTime',
          type: 'text',
          placeholder: 'Nome Time'
        }, {
          name: 'nameJogador1',
          type: 'text',
          placeholder: 'Jogador 1'
        }, {
          name: 'nameJogador2',
          type: 'text',
          placeholder: 'Jogador 2'
        }, {
          name: 'nameJogador3',
          type: 'text',
          placeholder: 'Jogador 3'
        }, {
          name: 'nameJogador4',
          type: 'text',
          placeholder: 'Jogador 4'
        }, {
          name: 'nameJogador5',
          type: 'text',
          placeholder: 'Jogador 5'
        }, {
          name: 'nameJogador6',
          type: 'text',
          placeholder: 'Jogador 6'
        }, {
          name: 'nameJogador7',
          type: 'text',
          placeholder: 'Jogador 7'
        }, {
          name: 'nameJogador8',
          type: 'text',
          placeholder: 'Jogador 8'
        }, {
          name: 'nameJogador9',
          type: 'text',
          placeholder: 'Jogador 9'
        }, {
          name: 'nameJogador10',
          type: 'text',
          placeholder: 'Jogador 10'
        },]}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Confirmar',
            handler: (alertData) => {

              const res = handleTeamCreated(alertData);

              if (typeof res !== "object") {
                setErrorTipoAlert(res);
                setErrorAlert(true);
                return false;
              }

              createTeam(keyCup, res.teamName, res.players).then(res => {
                if (res <= 2) {
                  setErrorTipoAlert(res);
                  setErrorAlert(true);
                } else {
                  setPlayer([]);
                  setTeamName("");
                  handlePopoverDismiss();
                }
              });

              return false;
            }
          }
        ]}
      />

      <IonAlert
        isOpen={errorAlert}
        onDidDismiss={() => setErrorAlert(false)}
        cssClass='alert-teams'
        header={`Error ${errorTipoAlert}`}
        message={`${errorDescricao[errorTipoAlert]}`}
        buttons={[
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]}
      />

    <IonCard>
            <IonImg src={require('../../media/dogo_error.jpg')}/>
            <IonCardHeader>
                <IonCardTitle>Opa!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Crie seu Time Aqui
            </IonCardContent>
        </IonCard>


    </div>

  )
}

export default Teams