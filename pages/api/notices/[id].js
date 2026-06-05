 import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query

  // GET — fetch single notice
  if (req.method === 'GET') {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id }
      })
      if (!notice) {
        return res.status(404).json({ error: 'Notice not found' })
      }
      return res.status(200).json(notice)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch notice' })
    }
  }

  // PUT — update existing notice
  if (req.method === 'PUT') {
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
      const notice = await prisma.notice.update({
        where: { id },
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
      return res.status(200).json(notice)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update notice' })
    }
  }

  // DELETE — remove notice
  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id }
      })
      return res.status(200).json({ message: 'Notice deleted successfully' })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete notice' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
