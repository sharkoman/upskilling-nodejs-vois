import { Router } from "express";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { User, validateUpdateUser } from "@/models/users";
import { asyncRoute } from "@/utils";

const router = Router();

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
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
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch(
  "/:id",
  asyncRoute(async (req, res) => {
    const { error, success, data } = validateUpdateUser(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: data!.name },
      { new: true }
    );

    if (!user) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(user);
  })
);

export default router;
