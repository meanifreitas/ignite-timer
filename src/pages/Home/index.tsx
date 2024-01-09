import { HandPalm, Play } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartButton,
  StopButton,
  TaskInput,
  TimeInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Fill out the project name'),
  time: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  time: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = React.useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  React.useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (difference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCicle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      time: data.time,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0)
    reset()
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  React.useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">I will be working on</label>
          <TaskInput
            list="task-suggestions"
            id="task"
            placeholder="Give your project a name"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
          </datalist>

          <label htmlFor="time">during</label>
          <TimeInput
            type="number"
            id="time"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('time', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Stop
          </StopButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartButton>
        )}
      </form>
    </HomeContainer>
  )
}
