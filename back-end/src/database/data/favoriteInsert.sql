CREATE OR ALTER TRIGGER trigger_favorite_insert
ON [dbo].[job_favorite]
FOR INSERT, UPDATE
AS 
BEGIN
DECLARE @jobId varchar(256)
DECLARE @userId varchar(256)
DECLARE @rating int
DECLARE @date DateTime
SELECT @userId = INSERTED.userId FROM INSERTED
SELECT @jobId = inserted.jobId FROM INSERTED
SELECT @date = inserted.deletedat FROM INSERTED
BEGIN
BEGIN TRY 
		IF EXISTS (SELECT TOP 1 index_name FROM [dbo].[applied_job] WHERE userId = @userId AND jobId = @jobId)
		RETURN
		IF EXISTS (SELECT TOP 1 ID FROM [dbo].[user_rating] where userId = @userId and jobId = @jobId)
		BEGIN
			SELECT top 1 @rating = rating
				   FROM [dbo].[user_rating] user_rating
				   WHERE user_rating.userId = @userId
				   AND user_rating.jobId = @jobId
			IF (@rating < 4 AND ISNULL(@date, 1) = 1)
			UPDATE [dbo].[user_rating] SET rating = 4 where userId = @userId AND jobId = @jobId
			IF (ISNULL(@date, 1) <> 1)
			UPDATE [dbo].[user_rating] SET rating = 1 where userId = @userId AND jobId = @jobId
 		END
		ELSE
		BEGIN
			IF (ISNULL(@date, 1) = 1)
				INSERT INTO [dbo].[user_rating](jobId, userId, rating) VALUES (@jobId, @userId, 4)
			ELSE
				INSERT INTO [dbo].[user_rating](jobId, userId, rating) VALUES (@jobId, @userId, 1)
		END
END TRY
BEGIN CATCH
END CATCH
END
END