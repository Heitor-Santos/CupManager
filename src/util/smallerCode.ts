import { AlertInput } from '@ionic/react'

/**
 * Array de inputs para quando o jogador atual é um goleiro, as opções de inputs são:
 * golsFavor, golsContra, assist
 */
export let inputsIsGoleiro = [
    {
        name: 'gol',
        type: 'radio',
        label: 'Marcou gol',
        value: 'golsFavor'
    },
    {
        name: 'assist',
        type: 'radio',
        label: 'Fez assistência',
        value: 'assist'
    },
    {
        name: 'golContra',
        type: 'radio',
        label: 'Marcou gol contra',
        value: 'golsContra'
    },
    {
        name: 'cartaoVermelho',
        type: 'radio',
        label: 'Vermelhou',
        value: 'cartaoVermelho'
    },
    {
        name: 'cartaoAmarelo',
        type: 'radio',
        label: 'Amarelou',
        value: 'cartaoAmarelo'
    }
    ] as AlertInput[]
    
/**
* Array de inputs para quando o jogador atual não é um goleiro, as opções de inputs são:
* golsFavor, golsContra, assist e isGoleiro
*/
export let inputsNotIsGoleiro = [
    {
        name: 'gol',
        type: 'radio',
        label: 'Marcou gol',
        value: 'golsFavor'
    },
    {
        name: 'assist',
        type: 'radio',
        label: 'Fez assistência',
        value: 'assist'
    },
    {
        name: 'golContra',
        type: 'radio',
        label: 'Marcou gol contra',
        value: 'golsContra'
    },
    {
        name: 'goleiro',
        type: 'radio',
        label: 'Marcar como goleiro',
        value: 'isGoleiro'
    },
    {
        name: 'cartaoVermelho',
        type: 'radio',
        label: 'Vermelhou',
        value: 'cartaoVermelho'
    },
    {
        name: 'cartaoAmarelo',
        type: 'radio',
        label: 'Amarelou',
        value: 'cartaoAmarelo'
    }
    ] as AlertInput[]