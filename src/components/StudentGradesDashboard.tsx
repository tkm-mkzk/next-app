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

type SortKey = 'name' | 'grade' | 'average' | null
type SortOrder = 'asc' | 'desc' | null

export const StudentGradesDashboard = ({ initialData }: GradeDashboardProps) => {
	const [filterGrade, setFilterGrade] = useState<string>('all')
	const [sortKey, setSortKey] = useState<SortKey>(null)
	const [sortOrder, setSortOrder] = useState<SortOrder>(null)

	const getAllSubjectsAverage = (grades: Grade[]): number => {
		if (grades.length === 0) return 0
		const total = grades.reduce((sum, grade) => sum + grade.score, 0)
		const average = total / grades.length

		return average
	}

	const filteredAndSortedData = useMemo(() => {
		// 全科目平均点をinitialDataに追加
		const initialDataWithAverage = initialData.map((data) => ({
			...data,
			average: getAllSubjectsAverage(data.grades),
		}))

		let filtered = initialDataWithAverage
		switch (filterGrade) {
			case '80+':
				filtered = initialDataWithAverage.filter((data) => data.average >= 80)
				break
			case '60+':
				filtered = initialDataWithAverage.filter((data) => data.average >= 60)
				break
			case '60-':
				filtered = initialDataWithAverage.filter((data) => data.average < 60)
		}

		if (!sortKey || !sortOrder) {
			return filtered
		}

		return [...filtered].sort((a, b) => {
			let compareValue = 0
			switch (sortKey) {
				case 'name':
					compareValue = a.studentName.localeCompare(b.studentName)
					break
				case 'grade':
					compareValue = a.grade.localeCompare(b.grade)
					break
				case 'average':
					compareValue = a.average - b.average
					break
			}
			return sortOrder === 'asc' ? compareValue : -compareValue
		})
	}, [initialData, filterGrade, sortKey, sortOrder])

	const getSortIcon = (key: SortKey) => {
		if (sortKey !== key) return ''
		if (sortOrder === 'asc') return '↑'
		if (sortOrder === 'desc') return '↓'
		return ''
	}

	const handleSort = (key: SortKey) => {
		if (sortKey !== key) {
			setSortKey(key)
			setSortOrder('desc')
		} else {
			if (sortOrder === 'desc') {
				setSortOrder('asc')
			} else if (sortOrder === 'asc') {
				setSortKey(null)
				setSortOrder(null)
			}
		}
	}

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
						<th onClick={() => handleSort('name')}>名前{getSortIcon('name')}</th>
						<th onClick={() => handleSort('grade')}>学年{getSortIcon('grade')}</th>
						<th onClick={() => handleSort('average')}>全科目平均点{getSortIcon('average')}</th>
					</tr>
				</thead>
				<tbody>
					{filteredAndSortedData.map((data) => (
						<tr key={data.studentId}>
							<td>{data.studentName}</td>
							<td>{data.grade}</td>
							<td>{data.average.toFixed(1)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
