import { Router } from "express";
import { asyncRoute } from "@/utils";
import {
  TBlogPayload,
  validateBlog,
  Blog,
  TBlogRequestBody,
} from "@/models/blog";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { IPaginatedResponse, IAuthenticatedRequest } from "@/interfaces";
import { Document, RootFilterQuery } from "mongoose";
import { authMiddleware, blogOwnershipMiddleware } from "@/middlewares";
import { TBlogFilter } from "@/models/blog";

const router = Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs with pagination and filtering
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of blogs per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter blogs by category ID
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: string
 *         description: Filter blogs by owner ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search blogs by title (case-insensitive partial match)
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Search blogs by content (case-insensitive partial match)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         description: Sort order by creation date
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedBlogResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/",
  [authMiddleware],
  asyncRoute(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      categoryId,
      ownerId,
      title,
      content,
      order = "desc",
    } = req.query as TBlogFilter;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const filterQuery: RootFilterQuery<TBlogPayload> = {};

    if (categoryId) {
      filterQuery.category = categoryId;
    }

    if (ownerId) {
      filterQuery.owner = ownerId;
    }

    if (title) {
      filterQuery.title = new RegExp(title, "i");
    }

    if (content) {
      filterQuery.content = {
        $regex: new RegExp(content, "i"),
      };
    }

    const blogs = await Blog.find<Document<TBlogPayload>>(filterQuery)
      .populate("category", "name _id")
      .populate("owner", "name email")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: order === "asc" ? 1 : -1 });

    const data: TBlogPayload[] = blogs.map((blog) => {
      return blog.toObject();
    });

    const total = await Blog.countDocuments(filterQuery);

    const payload: IPaginatedResponse<TBlogPayload> = {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  })
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a specific blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog unique identifier
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:id",
  [authMiddleware],
  asyncRoute(async (req, res) => {
    res.send("Blog by id...");
  })
);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       400:
 *         description: Blog already exists or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *                 - $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/",
  [authMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const { error, success, data } = validateBlog(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isBlogExists = await Blog.findOne({ title: data?.title });

    if (isBlogExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const blogData: TBlogRequestBody = {
      ...data!,
      owner: req.user?._id as string,
    };

    console.log({ blogData });

    const blog = await Blog.create(blogData);

    res.status(RESPONSE_STATUS.CREATED).json(blog);
  })
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog post (owner only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Not authorized to update this blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  "/:id",
  [authMiddleware, blogOwnershipMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const { error, success, data } = validateBlog(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data!, {
      new: true,
    });

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  })
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post (owner only)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog unique identifier
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Not authorized to delete this blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  "/:id",
  [authMiddleware, blogOwnershipMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    console.log({ blog: blog?.toObject() });

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  })
);

export default router;
