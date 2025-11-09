'use client'

import { useMemo, useState } from 'react'
import styles from './AttendanceDashboard.module.css'

export interface AttendanceRecord {
	studentId: string
	studentName: string
	totalClasses: number // 総授業数
	attendedClasses: number // 出席数
	grade: string // 学年（例: "1年", "2年", "3年"）
}

interface AttendanceDashboardProps {
	initialData: AttendanceRecord[]
}

type SortKey = 'name' | 'grade' | 'rate' | 'attended'
type SortOrder = 'asc' | 'desc' | null

const filterThresholdOptions = [
	{ label: '全て表示', value: 'all' },
	{ label: '80%以上', value: '80+' },
	{ label: '60%以上', value: '60+' },
]

export const AttendanceDashboard = ({ initialData }: AttendanceDashboardProps) => {
	const [filterThreshold, setFilterThreshold] = useState<string>('all')
	const [sortKey, setSortKey] = useState<SortKey | null>(null)
	const [sortOrder, setSortOrder] = useState<SortOrder>(null)

	// 出席率を計算
	const calculateRate = (record: AttendanceRecord): number => {
		return (record.attendedClasses / record.totalClasses) * 100
	}

	const handleSort = (key: SortKey) => {
		if (sortKey !== key) {
			// 別の項目をクリックした場合
			setSortKey(key)
			setSortOrder('desc') // 初回は降順
		} else {
			// 同じ項目をクリックした場合
			if (sortOrder === 'desc') {
				setSortOrder('asc')
			} else if (sortOrder === 'asc') {
				setSortKey(null)
				setSortOrder(null)
			}
		}
	}

	const getSortIcon = (key: SortKey) => {
		if (sortKey !== key) return ''
		if (sortOrder === 'asc') return '↑'
		if (sortOrder === 'desc') return '↓'
		return ''
	}

	const filteredAndSortedData = useMemo(() => {
		// 1. 出席率を一度だけ計算して保持
		const dataWithRate = initialData.map((record) => ({
			...record,
			rate: calculateRate(record),
		}))

		// 2. フィルタリング（計算済みのrateを使用）
		let filtered = dataWithRate
		switch (filterThreshold) {
			case '80+':
				filtered = dataWithRate.filter((record) => record.rate >= 80)
				break
			case '60+':
				filtered = dataWithRate.filter((record) => record.rate >= 60)
				break
		}

		// 3. ソート（計算済みのrateを使用）
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
				case 'rate':
					compareValue = a.rate - b.rate
					break
				case 'attended':
					compareValue = a.attendedClasses - b.attendedClasses
					break
			}
			return sortOrder === 'asc' ? compareValue : -compareValue
		})
	}, [filterThreshold, initialData, sortKey, sortOrder])

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<div className={styles.filterGroup}>
					出席率フィルター:
					<select
						className={styles.select}
						value={filterThreshold}
						onChange={(e) => setFilterThreshold(e.target.value)}
					>
						{filterThresholdOptions.map((filter) => (
							<option key={filter.value} value={filter.value}>
								{filter.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
								名前{getSortIcon('name')}
							</th>
							<th onClick={() => handleSort('grade')} style={{ cursor: 'pointer' }}>
								学年{getSortIcon('grade')}
							</th>
							<th onClick={() => handleSort('rate')} style={{ cursor: 'pointer' }}>
								出席率{getSortIcon('rate')}
							</th>
							<th onClick={() => handleSort('attended')} style={{ cursor: 'pointer' }}>
								出席数/総数{getSortIcon('attended')}
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredAndSortedData.map((record) => (
							<tr key={record.studentId}>
								<td>{record.studentName}</td>
								<td>{record.grade}</td>
								<td>{calculateRate(record).toFixed(1)}%</td>
								<td>
									{record.attendedClasses}/{record.totalClasses}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
