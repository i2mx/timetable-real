import './Timetable.css'

import { createSignal } from 'solid-js'

export default function Timetable() {
	const portal = localStorage.getItem('portal')
	const studentID = localStorage.getItem('studentID')
	const password = localStorage.getItem('password')

	const [timetable, setTimetable] = createSignal()

	fetch('https://kamar-api.deno.dev/', {
		method: 'POST',
		body: JSON.stringify({
			portal,
			studentID,
			password
		})
	})
		.then((data) => data.json())
		.then((json) => {
			const TT = [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']]
			for (let i = 0; i < json[0].length; i++) {
				TT.push([])
				for (let j = 0; j < json.length; j++) {
					TT[TT.length - 1].push(json[j][i])
				}
			}

			setTimetable(TT)
		})
	return (
		<Show
			when={timetable()}
			fallback={
				<div class="rounded bg-gradient-to-br from-red-300 to-orange-300 px-24 py-8 text-center text-7xl font-bold text-white">
					Loading...
				</div>
			}
		>
			<div class="flex justify-center">
				<table class="border-collapse min-w-full">
					<For each={timetable()}>
						{(day) => (
							<tr class="group min-w-full from-red-300 to-orange-300 first:rounded-md first:bg-gradient-to-br first:p-4 first:shadow-sm">
								<For each={day}>
									{(period) => (
										<td class="group-first:border-none first:border-none last:border-none border-x w-auto px-8 py-4">
											{() => {
                        if(typeof(period) == 'string'){
                          return <h1 class="font-mono text-lg font-extrabold">{period}</h1>
                        }
												else if (period.length < 7) {
													const periodName = period[0]
													const periodTime = period[1]
													return (
														<>
															<h1 class="font-mono text-lg font-extrabold">{periodName}</h1>
															<h1 class="font-mono">{periodTime}</h1>
														</>
													)
												} else if (period.length == 7) {
													const periodName = period[0]
													const periodTime = period[1]
													const grouping = period[3]
													const subject = period[4]
													const teacherCode = period[5]
													const roomCode = period[6]

													return (
														<>
															<h1 class="font-mono text-lg font-extrabold">{subject}</h1>
															<h1 class="font-mono">{periodTime}</h1>
															<h2 class="font-mono">
															 {roomCode} <span class='text-slate-500'>{teacherCode}</span>
															</h2>
														</>
													)
												}
											}}
										</td>
									)}
								</For>
							</tr>
						)}
					</For>
				</table>
			</div>
		</Show>
	)
}
