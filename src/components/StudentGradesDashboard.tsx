'use client'

import { useState, useMemo } from 'react'
import styles from '@/components/StudentGradesDashboard.module.css'

interface Grade {
	subject: string
	score: number
}

export interface StudentGrade {
	studentId: string
	studentName: string
	grade: string
	grades: Grade[]
}

interface GradeDashboardProps {
	initialData: StudentGrade[]
}

const filterGradeOptions = [
	{ label: '全て表示', value: 'all' },
	{ label: '優秀（平均80点以上）', value: '80+' },
	{ label: '良好（平均60点以上）', value: '60+' },
	{ label: '要注意（平均60点未満）', value: '60-' },
]

export const StudentGradesDashboard = ({ initialData }: GradeDashboardProps) => {
	const [filterGrade, setFilterGrade] = useState<string>('all')

	const getAllSubjectsAverage = (grades: Grade[]): string => {
		const total = grades.reduce((sum, grade) => sum + grade.score, 0)
		const average = (total / grades.length).toFixed(1)

		return average
	}

	const filteredData = useMemo(() => {
		// 全科目平均点をinitialDataに追加
		const initialDataWithAverage = initialData.map((data) => ({
			...data,
			average: getAllSubjectsAverage(data.grades),
		}))

		let filtered = initialDataWithAverage
		switch (filterGrade) {
			case '80+':
				filtered = initialDataWithAverage.filter((data) => Number(data.average) >= 80)
				break
			case '60+':
				filtered = initialDataWithAverage.filter((data) => Number(data.average) >= 60)
				break
			case '60-':
				filtered = initialDataWithAverage.filter((data) => Number(data.average) <= 60)
		}

		return filtered
	}, [initialData, filterGrade])

	return (
		<div className={styles.container}>
			<h1>生徒成績ダッシュボード</h1>
			<div>
				成績フィルター：
				<select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
					{filterGradeOptions.map((filter) => (
						<option key={filter.value} value={filter.value}>
							{filter.label}
						</option>
					))}
				</select>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>ID</th>
						<th>名前</th>
						<th>学年</th>
						<th>全科目平均点</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((student) => (
						<tr key={student.studentId}>
							<td>{student.studentId}</td>
							<td>{student.studentName}</td>
							<td>{student.grade}</td>
							<td>{student.average}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
