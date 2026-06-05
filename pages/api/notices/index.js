 import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  
  // GET — fetch all notices (urgent first)
  if (req.method === 'GET') {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priorityOrder: 'asc' },
          { createdAt: 'desc' }
        ]
      })
      return res.status(200).json(notices)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch notices' })
    }
  }

  // POST — create new notice
  if (req.method === 'POST') {
    const { title, body, category, priority, publishDate, imageUrl } = req.body

    // Server validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }
    if (!body || !body.trim()) {
      return res.status(400).json({ error: 'Body is required' })
    }
    if (!category || !['Exam', 'Event', 'General'].includes(category)) {
      return res.status(400).json({ error: 'Valid category is required' })
    }
    if (!priority || !['Urgent', 'Normal'].includes(priority)) {
      return res.status(400).json({ error: 'Valid priority is required' })
    }
    if (!publishDate || isNaN(new Date(publishDate).getTime())) {
      return res.status(400).json({ error: 'Valid date is required' })
    }

    try {
      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          priorityOrder: priority === 'Urgent' ? 0 : 1,
          publishDate: new Date(publishDate),
          imageUrl: imageUrl || null
        }
      })
      return res.status(201).json(notice)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create notice' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
