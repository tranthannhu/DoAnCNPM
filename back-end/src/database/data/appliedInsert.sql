CREATE OR ALTER TRIGGER trigger_applied
ON [dbo].[applied_job]
FOR INSERT 
AS 
BEGIN
DECLARE @jobId varchar(256)
DECLARE @userId varchar(256)
DECLARE @rating int
SELECT @userId = INSERTED.userId FROM INSERTED
SELECT @jobId = inserted.jobId FROM INSERTED
BEGIN
BEGIN TRY 
	BEGIN TRANSACTION
		IF EXISTS (SELECT TOP 1 ID FROM [dbo].[user_rating] where userId = @userId and jobId = @jobId)
		   UPDATE [dbo].[user_rating] SET rating = 5 where userId = @userId and jobId = @jobId
		ELSE
		   INSERT INTO [dbo].[user_rating](jobId, userId, rating) VALUES (@jobId, @userId, 5)
	COMMIT
END TRY
BEGIN CATCH
ROLLBACK TRANSACTION
END CATCH
END
END
