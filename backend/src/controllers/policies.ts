import { Request, Response } from 'express'
import policiesData from '../../data/policies.json' with { type: 'json' }
import { Policy } from '../types/policy.js'

export const getPolicies = (req: Request, res: Response): void => {
	const { page = 1, limit = 10 } = req.query
	const policies = policiesData as Policy[]
	const start = (Number(page) - 1) * Number(limit)
	const end = start + Number(limit)

	// controlamos que policies no este vacio.
	// NOTA: este condicional se puede omitir, ya que policiesData se importa en tiempo de arranque, por lo que
	// si falla no se levanta el servidor.
	if (policies.length === 0) {
		res.status(404).json({ message: 'No policies found in database' })
		return
	}

	// calculamos el total de paginas posibles segun el numero de items por pagina
	const totalPages = Math.ceil(policies.length / Number(limit))

	// controlamos que la pagina solicitada no sea mayor al total de paginas posibles
	// asi evitamos que se pidan paginas fuera de rango
	if (start >= policies.length) {
		res.status(400).json({
			message: 'Page out of range.',
			totalItems: policies.length,
			totalPages,
		})
		return
	}

	const paginatedPolicies = policies.slice(start, end)

	res.status(200).json({
		data: paginatedPolicies,
		items: paginatedPolicies.length,
		totalItems: policies.length,
		totalPages,
		page: Number(page),
		limit: Number(limit)
	})
}

export const getPolicyById = (req: Request, res: Response): void => {
	const { id } = req.params
	const policies = policiesData as Policy[]

	// controlamos que policies no este vacio
	if (policies.length === 0) {
		res.status(404).json({ message: 'No policies found in database' })
		return
	}

	const policy: Policy | undefined = policies.find((policy) => policy.id === Number(id))

	if (!policy) {
		res.status(404).json({ message: 'Policy not found' })
		return
	}

	res.status(200).json(policy)
}